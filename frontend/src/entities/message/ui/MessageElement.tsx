import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { cn } from "@/shared/lib/utils";
import { IMessage } from "@/shared/types/message.interface";

interface IMessageElementProps {
  message: IMessage;
  userId: string | undefined;
}

export const MessageElement = ({ message, userId }: IMessageElementProps) => {
  const isOwnerMessage = message.userId === userId;

  return (
    <li
      className={cn(`flex items-start gap-x-3.75`, {
        "self-end": isOwnerMessage,
      })}
    >
      <UserAvatar
        userAvatar={message.user.avatar}
        userName={message.user.name}
      />

      <div
        className={cn(
          `flex justify-between p-[10px_25px_23px_15px] w-[clamp(300px,35vw,600px)] bg-message-bg text-primary-color font-medium rounded-[16px_12px_12px_18px] shadow-box`,
        )}
      >
        <div>
          <h4 className="mb-2.5 font-bold">{message.user.name}</h4>
          <p className="font-normal">{message.text}</p>
        </div>

        <div className="text-opacity-color text-xs mt-2.5">
          {message.createdAt.split("T")[1].split(".")[0]}
        </div>
      </div>
    </li>
  );
};
