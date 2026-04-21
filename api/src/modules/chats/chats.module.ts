import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { ChatsGateway } from "./chats.gateway";
import { ChatsRepository } from "./chats.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "@/app/config/jwt.config";
import { ChatMemberModule } from "../chat-member/chat-member.module";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: JwtConfig,
			inject: [ConfigService],
		}),
		ChatMemberModule,
	],
	controllers: [ChatsController],
	providers: [ChatsService, ChatsRepository, ChatsGateway],
	exports: [ChatsGateway, ChatsService, ChatsRepository],
})
export class ChatsModule {}
