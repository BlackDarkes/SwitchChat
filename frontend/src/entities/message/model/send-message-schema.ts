import { type infer as zInfer, object, string } from "zod";

const sendMessageSchema = object({
  text: string().min(1, "Минимум 1 символ"),
});

type TypeSendMessageSchema = zInfer<typeof sendMessageSchema>;

export { type TypeSendMessageSchema, sendMessageSchema };