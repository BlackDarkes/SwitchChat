import { createZodDto } from "nestjs-zod";
import { type infer as zInfer, object, email, string } from "zod";

const loginSchema = object({
  email: email("Неверная почта"),
  password: string().min(6, "Минимум 6 символов"),
});

class LoginDto extends createZodDto(loginSchema) {};
type TypeLoginSchema = zInfer<typeof loginSchema>

export { type TypeLoginSchema, LoginDto };