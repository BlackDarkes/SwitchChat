import {
  createChatSchema,
  TypeCreateChatSchema,
} from "@/entities/chat/model/create-chat-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChatCreateStore } from "../model/chat-create-store";
import { useRouter } from "next/navigation";
import { useCreateChat } from "../api/create-chat";
import { InputField } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export const ChatCreateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col items-center gap-y-10 py-2")}
    >
      <h3 className={cn("text-[clamp(20px,1.5vw,24px)]")}>Создать чат</h3>

      <InputField
        type="text"
        name="name"
        register={register("name")}
        placeholder="Название чата"
        error={errors}
        watch={watch}
      />

      <div className={cn("w-full")}>
        <label htmlFor="type" className={cn("block mb-2 ml-2.5")}>
          Тип чата
        </label>
        <select
          {...register("type")}
          defaultValue="GROUP"
          className={cn(
            "w-full text-primary-color py-2 px-3 bg-primary-bg rounded-md border border-primary-color",
          )}
        >
          <option value="GROUP">Группа</option>
          <option value="CHANNEL">Канал</option>
        </select>
        {errors.type && <span>{errors.type.message}</span>}
      </div>

      <button
        type="submit"
        className={cn(
          `p-[12px_8px] w-full bg-accent-bg text-primary-color rounded-2xl uppercase transition duration-300 hover:bg-accent-bg/80`,
          `active:scale-99 active:duration-75`,
        )}
      >
        Создать
      </button>
    </form>
  );
};
