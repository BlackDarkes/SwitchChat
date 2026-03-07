import { type infer as zInfer, object, string } from "zod";

const loginSchema = object({
  email: string().email("Неверная почта"),
  password: string().min(6, "Минимум 6 символов"),
});

type TypeLoginSchema = zInfer<typeof loginSchema>;

export { type TypeLoginSchema, loginSchema };