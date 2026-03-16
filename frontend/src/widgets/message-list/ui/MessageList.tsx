'use client';

import { MessageElement } from '@/entities/message';
import { useLoginStore } from '@/features/auth/model/login-store';
import { IMessage } from '@/shared/types/message.interface';
import { Container } from '@/shared/ui';
import { useEffect, useRef, useMemo } from 'react';

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
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [uniqueMessages.length]);

  return (
    <section className="">
      <Container mod="default" className="px-6.25 py-[50px_20px]">
        <div
          ref={containerRef}
          className="flex flex-col gap-y-6.75 max-h-[60vh] overflow-y-auto"
        >
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
        </div>
      </Container>
    </section>
  );
};