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
    <li>
      <UserAvatar userAvatar={message.user.avatar} userName={message.user.name} />

      <p
        className={cn(``, {
          "text-right text-accent-color": isOwnerMessage,
        })}
      >
        {message.text}
      </p>
    </li>
  );
};
