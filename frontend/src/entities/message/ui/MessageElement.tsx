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
      className={cn("flex items-start gap-x-2.5", {
        "self-end": isOwnerMessage,
      })}
    >
      <UserAvatar
        userAvatar={message.user.avatar}
        userName={message.user.name}
        handleOpen={handleOpen}
      />

      <div
        className={cn(
          "flex justify-between flex-col gap-x-[clamp(5px,1.5vw,25px)] p-[10px_20px_17px_15px]",
          "max-w-150 bg-message-bg text-primary-color font-medium rounded-[16px_12px_12px_18px]",
          "shadow-box",
          "md:flex-row  max-md:p-[10px_20px_17px_12px]"
        )}
      >
        <div>
          <TruncateName className="mb-2.5 font-bold w-45 md:w-full">
            {message.user.name}
          </TruncateName>
          <p className={cn(
            "font-normal max-md:max-w-[clamp(80px,65vw,400px)]",
          )}>{message.text}</p>
        </div>

        <div className={cn(
          "text-opacity-color text-xs mt-2.5",
          "max-md:self-end",
        )}>
          {message.createdAt.split("T")[1].split(".")[0]}
        </div>
      </div>
    </li>
  );
});

MessageElement.displayName = "MessageElement";