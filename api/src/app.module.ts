import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SessionModule } from './modules/session/session.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AuthModule,
		UserModule,
		ChatsModule,
		MessagesModule,
		SessionModule,
		ContactsModule,
	],
})
export class AppModule {}
