"use client";

import { ChatElement, useChats } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";
import { useMobileMessages } from "@/features/mobile-messages";

interface IChatListProps {
  chats: IChat[] | undefined;
  isPending: boolean;
}

export const ChatList = ({ chats, isPending }: IChatListProps) => {
  const { handleOpen } = useMobileMessages();

  if (isPending) return <p>Loading...</p>;

  return (
    <Container>
      <ul className="flex flex-col gap-y-5 pt-5">
        {chats?.length ? (
          chats?.map((chat: IChat) => (
            <ChatElement key={chat.id} chat={chat} handleOpen={handleOpen} />
          ))
        ) : (
          <p className="pt-10 text-center">Вступите в чат чтобы они появились тут</p>
        )}
      </ul>
    </Container>
  );
};
