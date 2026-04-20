import {
	Controller,
	Delete,
	Get,
	Headers,
	HttpCode,
	Param,
	Patch,
  Req,
} from "@nestjs/common";
import { SessionService } from "./session.service";
import { Request } from "express";

@Controller("session")
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Get(":id")
	@HttpCode(200)
	async findSessionId(
		@Param("id") id: string,
		@Headers("user-agent") userAgent: string,
	) {
		return this.sessionService.findSessionId(id, userAgent);
	}

	@Patch(":id")
	@HttpCode(200)
	async updateSession(
		@Param("id") id: string,
    @Req() req: Request,
		@Headers("user-agent") userAgent: string,
	) {
		return this.sessionService.updateSession(id, req, userAgent);
	}

	@Delete(":id")
	@HttpCode(200)
	async removeSession(@Param("id") id: string) {
		return this.sessionService.removeSession(id);
	}
}
