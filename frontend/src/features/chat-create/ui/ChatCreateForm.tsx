"use client";

import {
  createChatSchema,
  TypeCreateChatSchema,
} from "@/entities/chat/model/validate/create-chat-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useChatCreateStore } from "../model/chat-create-store";
import { useRouter } from "next/navigation";
import { useCreateChat } from "../api/create-chat";
import {
  InputField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

export const ChatCreateForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TypeCreateChatSchema>({
    mode: "onChange",
    defaultValues: { name: "", type: "GROUP" },
    resolver: zodResolver(createChatSchema),
  });

  const { handleOpen } = useChatCreateStore();
  const { mutateAsync: createChat, isPending } = useCreateChat();
  const router = useRouter();

  const onSubmit: SubmitHandler<TypeCreateChatSchema> = async (data) => {
    try {
      const result = await createChat(data);
      handleOpen();
      toast.success(result.message);
      setValue("name", "");
      router.push(`/chat/${result.chat.id}`);
    } catch {
      toast.error("Произошла ошибка при создании чата.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[320px] flex-col gap-6 px-4 py-6"
    >
      <h3 className="text-xl font-bold text-center text-primary-color">
        Создать чат
      </h3>

      <div className="flex flex-col gap-1.5 mt-5">
        <InputField
          type="text"
          name="name"
          register={register("name")}
          placeholder="Название чата"
          error={errors}
          watch={watch}
          autocomplete="off"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary-color">
          Тип чата
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isPending}
            >
              <SelectTrigger
                className={cn(
                  "w-full border-border-color bg-primary-bg text-primary-color ",
                  "focus:ring-accent-color/50 hover:border-secondary-color/50 transition-colors",
                  errors.type && "border-red-500 focus:ring-red-500/50",
                )}
              >
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent className="z-800 bg-primary-bg border-border-color text-primary-color">
                <SelectItem value="GROUP">Группа</SelectItem>
                <SelectItem value="CHANNEL">Канал</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <span className="text-xs text-red-500 mt-0.5">
            {errors.type.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-accent-color text-white font-medium text-sm",
          "transition-all duration-200",
          "hover:opacity-90 active:scale-[0.98]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {isPending ? "Создание..." : "Создать"}
      </button>
    </form>
  );
};
