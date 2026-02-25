import {
	type infer as zInfer,
	object,
	string,
	uuid,
	enum as zEnum,
	array,
	number,
} from "zod";
import { createZodDto } from "nestjs-zod";
import { EnumMessageType, EnumMimeType } from "@/app/generated/prisma/enums";

const createMessageSchema = object({
	text: string().min(1, "Минимум 1 символ").optional(),
	type: zEnum(EnumMessageType).default(EnumMessageType.TEXT),
	replyToId: uuid().optional(),
	attachments: array(
		object({
			fileUrl: string(),
			fileName: string(),
			fileSize: number(),
			mimeType: zEnum(EnumMimeType).default(EnumMimeType.IMAGE),
		}),
	).optional(),
});

type TypeCreateMessageSchema = zInfer<typeof createMessageSchema>;

class CreateMessageDto extends createZodDto(createMessageSchema) {}

export { type TypeCreateMessageSchema, createMessageSchema, CreateMessageDto };
