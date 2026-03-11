"use client";

import { ChatElement, useChats } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";

export const ChatList = () => {
  const {  data, isPending } = useChats();

  if (isPending) return <p>Loading...</p>;

  console.log("Chats: ", data?.chats)

  return (
    <section className="w-full">
      <Container>
        <ul>
          {data?.chats.length ? data.chats.map((chat: IChat) => (
            <ChatElement key={chat.id} chat={chat} />
          )) : (
            <p className="text-center">Вступите в чат чтобы они появились тут</p>
          )}
        </ul>
      </Container>
    </section>
  );
}