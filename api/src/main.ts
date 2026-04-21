import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);

	app.use(cookieParser());

	app.enableCors({
		origin: [
			config.get<string>("CLIENT_URL"),
			config.get<string>("CLIENT_URL_2"),
			config.get<string>("CLIENT_URL_3"),
		],
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		headers: "Content-Type, Authorization",
	});

	await app.listen(config.get<number>("PORT") || 8000, config.get<string>("HOST") || "0.0.0.0");
}
bootstrap();
