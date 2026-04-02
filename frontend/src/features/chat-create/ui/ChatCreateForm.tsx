import {
  createChatSchema,
  TypeCreateChatSchema,
} from "@/entities/chat/model/create-chat-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChatCreateStore } from "../model/chat-create-store";
import { useRouter } from "next/navigation";
import { useCreateChat } from "../api/create-chat";

export const ChatCreateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TypeCreateChatSchema>({
    mode: "onChange",
    defaultValues: {
      name: "",
      type: "GROUP",
    },
    resolver: zodResolver(createChatSchema),
  });
  const { handleOpen } = useChatCreateStore();
  const { mutateAsync: createChat } = useCreateChat();
  const router = useRouter();

  const onSubmit: SubmitHandler<TypeCreateChatSchema> = async (
    data: TypeCreateChatSchema,
  ) => {
    try {
      const result = await createChat(data);
      setValue("name", "");
      setValue("type", "GROUP");
      handleOpen();
      router.push(`/chat/${result.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <select {...register("type")}>
          <option value="DIRECT">DIRECT</option>
          <option value="GROUP">GROUP</option>
          <option value="CHANNEL">CHANNEL</option>
        </select>
        {errors.type && <span>{errors.type.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
