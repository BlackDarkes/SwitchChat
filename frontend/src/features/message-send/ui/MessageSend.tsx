import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageButton } from "./message-button/MessageButton";
import { MessageInput } from "./message-input/MessageInput";
import { sendMessageSchema, TypeSendMessageSchema } from "@/entities/message";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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
    } catch {
      toast.error("Не удалось отправить сообщение");
    }
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
