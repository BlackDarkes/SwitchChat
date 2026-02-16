/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeRegisterSchema } from './common/dto/register.dto';
import { Request, Response } from 'express';
import { TypeLoginSchema } from './common/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(201)
  async register(@Body() data: TypeRegisterSchema) {
    await this.authService.register(data);

    return {
      message: "Пользователь успешно зарегистрирован",
    };
  }

  @Post("login")
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: TypeLoginSchema,
  ) {
    const { password: _, ...user } = await this.authService.login(res, data);

    return {
      message: "Пользователь успешно авторизован",
      user,
    };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);

    return {
      message: "Вы успешно вышли из аккаунта",
    }
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.refresh(req, res);

    return {
      message: "Токены успешно обновлены",
      user,
    };
  }
}
