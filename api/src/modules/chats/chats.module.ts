import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { ChatsGateway } from "./chats.gateway";
import { ChatRepository } from "./chat.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "@/app/config/jwt.config";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: JwtConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [ChatsController],
	providers: [ChatsService, ChatRepository, ChatsGateway],
})
export class ChatsModule {}
