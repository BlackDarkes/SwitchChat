import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import { isDev } from "@/utils/is-dev.utils";
import { v4 as uuid } from "uuid";
import { TypeRegisterSchema } from "./common/dto/register.dto";
import { UserService } from "../user/user.service";
import { TypeLoginSchema } from "./common/dto/login.dto";
import { IPayload } from "./types/payload.interface";
import { SessionService } from "../session/session.service";

@Injectable()
export class AuthService {
	private TTL_ACCESS_TOKEN: string;
	private TTL_REFRESH_TOKEN: string;
	private COOKIE_DOMAIN: string | undefined;

	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
		private readonly jwtService: JwtService,
	) {
		this.TTL_ACCESS_TOKEN =
			this.configService.getOrThrow<string>("TTL_ACCESS_TOKEN");
		this.TTL_REFRESH_TOKEN =
			this.configService.getOrThrow<string>("TTL_REFRESH_TOKEN");
		this.COOKIE_DOMAIN = this.configService.get<string>("COOKIE_DOMAIN");
	}

	async register(data: TypeRegisterSchema) {
		const { email, name, password } = data;
		const existingUser = await this.userService.getByEmail(email);

		if (existingUser) {
			throw new UnauthorizedException(
				"Пользователь с такой почтой уже зарегистрирован",
			);
		}

		const id = uuid();
		const username = this.createUsername(id);

		await this.userService.create({
			email,
			name,
			username,
			password: await hash(password, 10),
		});
	}

	async login(res: Response, data: TypeLoginSchema, userAgent) {
		const { email, password } = data;
		const user = await this.userService.getByEmail(email);

		if (!user || !(await compare(password, user.password))) {
			throw new UnauthorizedException("Неверный логин или пароль");
		}

		await this.auth(res, user.id, user.email, user.username, userAgent);
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

	async logout(req: Request, res: Response) {
		const refreshToken = req.cookies?.["refresh_token"];

		if (refreshToken) {
			await this.sessionService.removeSession(refreshToken);
		}

		return this.clearTokens(res);
	}

	async refresh(req: Request, res: Response, userAgent: string) {
		const refreshToken = req?.cookies?.["refresh_token"];

		if (!refreshToken) {
			throw new UnauthorizedException("Пользователь не авторизован");
		}

		try {
			const payload: IPayload = this.jwtService.verify(refreshToken);
			const user = await this.userService.getById(payload.id);

			if (!user) {
				throw new UnauthorizedException("Пользователь не найден");
			}

			await this.auth(res, user.id, user.email, user.username, userAgent);

			return user;
		} catch {
			this.clearTokens(res);
			throw new UnauthorizedException("Пользователь не авторизован");
		}
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
	};

	private setCookie(
		res: Response,
		name: string,
		value: string,
		expires?: Date,
	) {
		const secure = this.isSecureContext(); 

		res.cookie(name, value, {
			httpOnly: true,
			secure, // 🔥 false для http://localhost
			sameSite: secure ? "none" : "lax", // 🔥 lax для http://localhost
			path: "/",
			expires,
			// 🔥 domain: НИКОГДА для localhost
			...(secure && this.COOKIE_DOMAIN ? { domain: this.COOKIE_DOMAIN } : {}),
		});
	}

	private clearTokens(res: Response) {
		const secure = this.isSecureContext();

		const options: any = {
			httpOnly: true,
			secure,
			sameSite: secure ? "none" : "lax",
			path: "/",
			expires: new Date(0),
		};

		if (secure && this.COOKIE_DOMAIN) {
			options.domain = this.COOKIE_DOMAIN;
		}

		res.cookie("access_token", "", options);
		res.cookie("refresh_token", "", options);
	}

	private async auth(
		res: Response,
		id: string,
		email: string,
		tag: string,
		userAgent: string,
	) {
		const { access_token, refresh_token } = this.crateTokens(id, email, tag);

		await this.sessionService.updateSession(id, refresh_token, userAgent);

		const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hours
		const refreshTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

		this.setCookie(res, "access_token", access_token, accessTokenExpires);
		this.setCookie(res, "refresh_token", refresh_token, refreshTokenExpires);
	}

	private createUsername(id: string) {
		return `user_${id.split("-")[0]}`;
	}

	private isSecureContext(): boolean {
		return process.env.NODE_ENV === "production";
	}
}
