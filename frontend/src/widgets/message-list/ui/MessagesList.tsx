import { MessageElement } from "@/entities/message";
import { IMessage } from "@/shared/types/message.interface";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}
  
export const MessagesList = ({ messages }: IMessagesListProps) => {
  return (
    <ul>
      { messages?.map((message) => (
        <li key={message.id}>
          <MessageElement message={message} />
        </li>
      )) }
    </ul>
  );
}