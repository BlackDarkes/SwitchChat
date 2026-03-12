import { IMessage } from "@/shared/types/message.interface";

interface IMessageElementProps {
  message: IMessage;
}
  
export const MessageElement = ({ message }: IMessageElementProps) => {
  return (
    <p>{message.text}</p>
  );
}