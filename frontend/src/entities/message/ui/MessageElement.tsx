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
      
      <p className={cn(
        ``,
        {
          "text-right text-accent-color": isOwnerMessage
        }
      )}>{message.text}</p>
    </li>
  );
}