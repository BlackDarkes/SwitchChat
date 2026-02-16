import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';
import { hash, compare } from "bcryptjs";
import { isDev } from "@/utils/is-dev.utils";
import { v4 as uuid } from "uuid";
import { TypeRegisterSchema } from './common/dto/register.dto';
import { UserService } from '../user/user.service';
import { TypeLoginSchema } from './common/dto/login.dto';
import { IPayload } from './types/payload.interface';

@Injectable()
export class AuthService {
  private TTL_ACCESS_TOKEN: string;
  private TTL_REFRESH_TOKEN: string;
  private COOKIE_DOMAIN: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.TTL_ACCESS_TOKEN = this.configService.getOrThrow<string>("TTL_ACCESS_TOKEN");
    this.TTL_REFRESH_TOKEN = this.configService.getOrThrow<string>("TTL_REFRESH_TOKEN");
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>("COOKIE_DOMAIN");
  }

  async register(data: TypeRegisterSchema) {
    const { email, name, password } = data;
    const existingUser = await this.userService.getByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException("Пользователь с такой почтой уже зарегистрирован");
    }

    const id = uuid();
    const tag = this.createTag(id);

    await this.userService.create({
      email,
      name, 
      tag,
      password: await hash(password, 10),
    })
  }

  async login(res: Response, data: TypeLoginSchema) {
    const { email, password } = data;
    const user = await this.userService.getByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    this.auth(res, user.id, user.email, user.tag);
    return user;
  }

  validate(payload: IPayload) {
    const { id } = payload;

    const user = this.userService.getById(id);

    if (!user) {
      throw new UnauthorizedException("Пользователь не найден");
    }

    return user;
  }

  async logout(res: Response) {
    return this.clearTokens(res);
  }

  private crateTokens = (id: string, email: string, tag: string) => {
    const payload: IPayload = { id, email, tag };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.TTL_ACCESS_TOKEN,
    } as any);

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.TTL_REFRESH_TOKEN,
    } as any);

    return { access_token, refresh_token };
  }

  private setCookie(res: Response, name: string, value: string, expires?: Date) {
    res.cookie(name, value, {
      httpOnly: true,
      secure: !isDev(this.configService),
      domain: this.COOKIE_DOMAIN,
      expires,
      sameSite: !isDev(this.configService) ? "none" : "lax",
      path: "/",
    })
  }

  private clearTokens(res: Response) {
    const cookieOptions = {
      httpOnly: true,
      secure: !isDev(this.configService),
      domain: this.COOKIE_DOMAIN,
    };

    res.cookie("access_token", "", { ...cookieOptions, expires: new Date(0) });
    res.cookie("refresh_token", "", { ...cookieOptions, expires: new Date(0) });
  }

  private auth(res: Response, id: string, email: string, tag: string) {
    const { access_token, refresh_token } = this.crateTokens(id, email, tag);

    const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hours
    const refreshTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

    this.setCookie(res, "access_token", access_token, accessTokenExpires);
    this.setCookie(res, "refresh_token", refresh_token, refreshTokenExpires);
  }

  private createTag(id: string) {
    return `user_${id.split("-")[0]}`;
  }
}
