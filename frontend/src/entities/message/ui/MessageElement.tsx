import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { IMessage } from "@/shared/types";
import { TruncateName } from "@/shared/ui";
import { memo } from "react";

interface IMessageElementProps {
  message: IMessage;
  userId: string | undefined;
  handleOpen: () => void;
}

export const MessageElement = memo(({ message, userId, handleOpen }: IMessageElementProps) => {
  const isOwnerMessage = message.userId === userId;

  return (
    <li
      className={cn(
        "flex w-full items-end gap-2.5",
        isOwnerMessage ? "flex-row-reverse" : "flex-row"
      )}
    >
      <button
        type="button"
        onClick={handleOpen}
        className="shrink-0 translate-y-0.5 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label={`Профиль: ${message.user.name}`}
      >
        <UserAvatar
          userAvatar={message.user.avatar}
          userName={message.user.name}
        />
      </button>

      <div
        className={cn(
          "relative max-w-[min(85%,420px)] px-4 py-2.5 rounded-2xl",
          "transition-colors duration-200",
          "shadow-box",
          isOwnerMessage
            ? "bg-accent-bg dark:bg-[#1a2633] rounded-br-md"
            : "bg-message-bg rounded-bl-md"
        )}
      >
        {!isOwnerMessage && (
          <TruncateName className="mb-1.5 block text-[12px] font-semibold text-secondary-color">
            {message.user.name}
          </TruncateName>
        )}

        <p className="text-[15px] leading-[1.45] wrap-break-word whitespace-pre-wrap text-primary-color">
          {message.text}
        </p>

        <div className="flex justify-end mt-1.5 select-none">
          <time
            className={cn(
              "text-[11px] font-medium tabular-nums tracking-wide",
              isOwnerMessage ? "text-opacity-color/80" : "text-opacity-color/70"
            )}
            dateTime={message.createdAt}
          >
            {new Date(message.createdAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
      </div>
    </li>
  );
});

MessageElement.displayName = "MessageElement";