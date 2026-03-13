import { useForm } from "react-hook-form";
import { MessageButton } from "./message-button/MessageButton";
import { MessageInput } from "./message-input/MessageInput";
import { messageSchema, TypeMessageSchema } from "../model/message-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const MessageSend = () => {
  const { register, handleSubmit, setValue } = useForm<TypeMessageSchema>({
    mode: "onChange",
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = async (data: TypeMessageSchema) => {
    console.log(data.message);
    setValue("message", "");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between items-center gap-x-5 p-[4px_30px_4px_15px] bg-primary-bg rounded-4xl">
      <MessageInput register={register("message")} />
      <MessageButton />
    </form>
  );
}