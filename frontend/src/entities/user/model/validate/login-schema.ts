import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Неверный формат почты"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type TypeLoginSchema = z.infer<typeof loginSchema>;

export { type TypeLoginSchema, loginSchema };