"use client";

import { MessageElement } from "@/entities/message";
import { useLoginStore } from "@/features/auth/model/login-store";
import { IMessage } from "@/shared/types/message.interface";
import { Container } from "@/shared/ui";
import { useEffect, useRef, useMemo } from "react";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}

export const MessageList = ({ messages }: IMessagesListProps) => {
  const { user } = useLoginStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const uniqueMessages = useMemo(() => {
    if (!messages) return [];
    const seen = new Set();
    return messages.filter((msg) => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    });
  }, [messages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [uniqueMessages.length]);

  return (
    <section ref={containerRef} className="overflow-y-auto custom-scroll">
      <Container mod="default" className="px-6.25 ">
        <ul className="flex flex-col gap-y-6.75 max-h-[calc(100vh-200px)] pt-6.25 after:block after:h-2.5 after:shrink-0">
          {uniqueMessages.length === 0 ? (
            <p className="pt-10">Нет сообщений</p>
          ) : (
            uniqueMessages.map((message) => (
              <MessageElement
                key={message.id}
                message={message}
                userId={user?.id}
              />
            ))
          )}
        </ul>
      </Container>
    </section>
  );
};
