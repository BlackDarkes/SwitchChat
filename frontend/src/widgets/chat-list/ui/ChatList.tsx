"use client";

import { ChatElement } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";
import { useMobileMessages } from "@/features/mobile-messages";
import { ChatListSkeleton } from "./ChatListSkeleton";
import { ChatElementDirect } from "@/entities/chat/ui/ChatElementDirect";

interface IChatListProps {
  chats: IChat[] | undefined;
  isPending: boolean;
}

export const ChatList = ({ chats, isPending }: IChatListProps) => {
  const { handleOpen } = useMobileMessages();

  if (isPending) return <ChatListSkeleton />;

  return (
    <section className="w-full overflow-auto custom-scroll">
      <Container>
        <ul className="flex flex-col max-h-[calc(100vh-200px)] gap-y-5 pt-5 py-5 after:block after:h-2.5 after:shrink-0">
          {chats?.length ? (
            chats?.map((chat: IChat) => {
              if (chat.type === "DIRECT") {
                return <ChatElementDirect key={chat.id} chat={chat} handleOpen={handleOpen} />;
              } else {
                return <ChatElement key={chat.id} chat={chat} handleOpen={handleOpen} />;
              }
            })
          ) : (
            <p className="pt-10 text-center">
              Вступите в чат чтобы они появились тут
            </p>
          )}
        </ul>
      </Container>
    </section>
  );
};
