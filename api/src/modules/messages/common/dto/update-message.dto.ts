import { type infer as zInfer, object, string } from "zod";
import { createZodDto } from "nestjs-zod";

const updateMessageSchema = object({
	text: string().min(1, "Минимум 1 символ"),
});

type TypeUpdateMessageSchema = zInfer<typeof updateMessageSchema>;

class UpdateMessageDto extends createZodDto(updateMessageSchema) {}

export { type TypeUpdateMessageSchema, updateMessageSchema, UpdateMessageDto };