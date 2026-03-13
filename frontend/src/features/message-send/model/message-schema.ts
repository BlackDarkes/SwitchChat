import { type infer as zInfer, object, string } from "zod";

const messageSchema = object({
  message: string().min(1, "Минимум 1 символ"),
});

type TypeMessageSchema = zInfer<typeof messageSchema>;

export { type TypeMessageSchema, messageSchema };