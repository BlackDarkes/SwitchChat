"use client";

import { ChatElement, useChats } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";

export const ChatList = () => {
  const { data, isPending } = useChats();

  if (isPending) return <p>Loading...</p>;

  return (
    <Container>
      <ul className="flex flex-col gap-y-5 pt-5">
        {data?.chats.length ? (
          data.chats.map((chat: IChat) => (
            <ChatElement key={chat.id} chat={chat} />
          ))
        ) : (
          <p className="pt-10 text-center">Вступите в чат чтобы они появились тут</p>
        )}
      </ul>
    </Container>
  );
};
