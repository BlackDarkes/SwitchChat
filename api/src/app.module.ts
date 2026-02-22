import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AuthModule,
		UserModule,
		ChatsModule,
		MessagesModule,
	],
})
export class AppModule {}
