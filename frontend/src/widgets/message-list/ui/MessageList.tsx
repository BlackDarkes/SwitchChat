"use client";

import { MessageElement } from "@/entities/message";
import { useLoginStore } from "@/features/auth/model/login-store";
import { IMessage } from "@/shared/types/message.interface";
import { Container } from "@/shared/ui";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}

export const MessageList = ({ messages }: IMessagesListProps) => {
  const { user } = useLoginStore();

  return (
    <section className="">
      <Container mod="default" className="px-6.25 py-[50px_20px]">
        <ul className="flex flex-col justify-center gap-y-6.75">
          {messages?.length === 0 ? (
            <p className="pt-10 ">Нет сообщений</p>
          ) : (
            <>
              {messages?.map((message) => (
                <MessageElement
                  key={message.id}
                  message={message}
                  userId={user?.id}
                />
              ))}
            </>
          )}
        </ul>
      </Container>
    </section>
  );
};
