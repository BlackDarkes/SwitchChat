import { type infer as zInfer, object, email, string } from "zod";

const registerSchema = object({
  email: email("Неверная почта"),
  name: string().min(2, "Минимум 2 символа"),
  password: string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}/,
      "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и один специальный символ",
    )
    .min(6, "Минимум 6 символов"),
});

type TypeRegisterSchema = zInfer<typeof registerSchema>;

export { type TypeRegisterSchema, registerSchema };