import { type infer as zInfer, email, file, object, string } from "zod";

const profileUpdateSchema = object({
  avatar: file().nullable(),
  name: string().nullable(),
  email: email("Неверная почта").nullable(),
  bio: string().nullable(),
});

type TypeProfileUpdateSchema = zInfer<typeof profileUpdateSchema>;

export { type TypeProfileUpdateSchema, profileUpdateSchema };