import { type infer as zInfer, object, string, enum as zEnum } from "zod";

const createChatSchema = object({
  type: zEnum(["DIRECT", "GROUP", "CHANNEL"]),
  name: string(),
  ownerId: string(),
})


type TypeCreateChatSchema = zInfer<typeof createChatSchema>;

export { type TypeCreateChatSchema, createChatSchema  };