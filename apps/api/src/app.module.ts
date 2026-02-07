import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./modules/prisma/prisma.module.js";

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
	],
})
export class AppModule {}
