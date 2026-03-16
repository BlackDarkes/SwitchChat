import { useForm } from "react-hook-form";
import { MessageButton } from "./message-button/MessageButton";
import { MessageInput } from "./message-input/MessageInput";
import { sendMessageSchema, TypeSendMessageSchema } from "../../../entities/message/model/send-message-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { useParams } from "next/navigation";

export const MessageSend = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue } = useForm<TypeSendMessageSchema>({
    mode: "onChange",
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: "",
    },
  });
  const { sendMessage } = useChatMessages(id);

  const onSubmit = async (data: TypeSendMessageSchema) => {
    try {
      await sendMessage(data);
    } catch (error) {
      console.log(error);
    }
    console.log(data.text);
    setValue("text", "");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between items-center gap-x-5 p-[4px_30px_4px_15px] bg-primary-bg rounded-4xl"
    >
      <MessageInput register={register("text")} />
      <MessageButton />
    </form>
  );
};
