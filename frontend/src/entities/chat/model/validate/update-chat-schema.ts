import { type infer as zInfer, object, string, file } from "zod";

const updateChatSchema = object({
  name: string().nullish(),
  description: string().nullish(),
  avatar: file().nullish(),
})

type TypeUpdateChatSchema = zInfer<typeof updateChatSchema>;

export { type TypeUpdateChatSchema, updateChatSchema };