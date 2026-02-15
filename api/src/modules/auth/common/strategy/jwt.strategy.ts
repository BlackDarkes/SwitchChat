import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { AuthService } from "../../auth.service";
import { Injectable } from "@nestjs/common";
import { IPayload } from "../../types/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          return req?.cookies?.["access_token"] ?? null;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
      algorithms: ["HS256"],
    })
  }

  async validate(payload: IPayload) {
    return await this.authService.validate(payload);
  }
}