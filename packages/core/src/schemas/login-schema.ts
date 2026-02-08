 import { type infer as zInfer, object, string, email } from "zod";

export const LoginSchema = object({
  email: email("Неверный email"),
  password: string().min(6, "Минимум 6 символов"),
});

export type LoginSchema = zInfer<typeof LoginSchema>;