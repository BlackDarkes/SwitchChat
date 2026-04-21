"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";  
import { useChatUpdate } from "@/features/chat-update/api/chat-update";
import { toast } from "sonner";
import { IChat } from "@/shared/types";
import { cn } from "@/shared/lib/utils";
import { TypeUpdateChatSchema, updateChatSchema } from "@/entities/chat";
import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";

interface IChatUpdateFormProps {
  chat: IChat;
  onSuccess?: () => void;
}

export const ChatUpdateForm = ({ chat, onSuccess }: IChatUpdateFormProps) => {
  const { mutate, isPending } = useChatUpdate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeUpdateChatSchema>({
    mode: "onChange",
    defaultValues: {
      name: chat.name,
      description: chat.description,
      avatar: null,
    },
    resolver: zodResolver(updateChatSchema),
  });

  const onSubmit: SubmitHandler<TypeUpdateChatSchema> = async (data) => {
    try {
      mutate({ id: chat.id, data });
      toast.success("Чат успешно обновлен.");
      onSuccess?.();
    } catch {
      toast.error("Произошла ошибка при обновлении чата.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[320px] flex-col gap-6 px-4 py-6">
      <h3 className="text-xl font-bold text-center text-primary-color">Настройки чата</h3>

      <div className="flex flex-col items-center gap-2">
        <label className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-border-color bg-primary-bg/50 hover:bg-secondary-bg/20 transition-colors">
          <ChatAvatar chatAvatar={chat.avatar} chatName={chat.name} size="middle" />
          <input type="file" accept="image/*" className="hidden" {...register("avatar")} />
        </label>
        <span className="text-xs text-secondary-color select-none">Изменить аватар</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary-color">Название</label>
        <input
          {...register("name")}
          disabled={isPending}
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm text-primary-color placeholder:text-secondary-color/50 focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition",
            errors.name && "border-red-500 focus:ring-red-500/50"
          )}
          placeholder="Введите название"
        />
        {errors.name && <span className="text-xs text-red-500 mt-0.5">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary-color">Описание</label>
        <textarea
          {...register("description")}
          rows={3}
          disabled={isPending}
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm text-primary-color placeholder:text-secondary-color/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition",
            errors.description && "border-red-500 focus:ring-red-500/50"
          )}
          placeholder="Опишите чат (необязательно)"
        />
        {errors.description && <span className="text-xs text-red-500 mt-0.5">{errors.description.message}</span>}
      </div>

      <div className="flex gap-3 w-full mt-2">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="flex-1 px-4 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm font-medium text-primary-color hover:bg-secondary-bg/30 transition disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-4 py-2.5 rounded-xl bg-accent-color text-sm font-medium text-white hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
        >
          {isPending ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
};