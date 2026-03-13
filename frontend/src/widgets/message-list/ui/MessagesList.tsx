"use client";

import { MessageElement } from "@/entities/message";
import { useLoginStore } from "@/features/auth/model/login-store";
import { IMessage } from "@/shared/types/message.interface";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}
  
export const MessagesList = ({ messages }: IMessagesListProps) => {
  const { user } = useLoginStore();

  return (
    <ul>
      { messages?.map((message) => (
        <MessageElement key={message.id} message={message} userId={user?.id} />
        
      )) }
    </ul>
  );
}