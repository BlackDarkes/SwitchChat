import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
	public client: PrismaClient;

	constructor(private readonly configService: ConfigService) {
		const pool = new Pool({
			connectionString: configService.get("DATABASE_URL"),
		});

		const adapter = new PrismaPg(pool);

		this.client = new PrismaClient({ adapter });
	}

	async onModuleDestroy() {
		return this.client.$disconnect();
	}

	async onModuleInit() {
		return this.client.$connect();
	}
}
