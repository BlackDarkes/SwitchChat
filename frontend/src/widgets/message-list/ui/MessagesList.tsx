"use client";

import { MessageElement } from "@/entities/message";
import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { useLoginStore } from "@/features/auth/model/login-store";
import { IChat } from "@/shared/types/chat.interface";

interface IMessagesListProps {
  chat: IChat | undefined;
}

export const MessagesList = ({ chat }: IMessagesListProps) => {
  const { user } = useLoginStore();

  console.log("chatMember", chat?.messages[0].user)

  return (
    <ul>
      {chat?.messages.length === 0 ? (
        <p className="pt-10 text-center">Нет сообщений</p>
      ) : (
        <>
          {chat?.messages.map((message) => (
            <MessageElement
              key={message.id}
              message={message}
              userId={user?.id}
            />
          ))}
        </>
      )}
    </ul>
  );
};
