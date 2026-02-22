import { type infer as zInfer, object, string, enum as zEnum } from "zod";
import { createZodDto } from "nestjs-zod";
import { EnumChatTypes } from "@/app/generated/prisma/enums";

const chatSchema = object({
  type: zEnum(EnumChatTypes),
  name: string(),
  ownerId: string(),
})

const CreateChatDto = createZodDto(chatSchema);

type TypeCreateChatSchema = zInfer<typeof chatSchema>;

export { type TypeCreateChatSchema, CreateChatDto  };