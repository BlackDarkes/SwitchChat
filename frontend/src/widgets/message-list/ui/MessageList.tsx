"use client";

import { MessageElement } from "@/entities/message";
import { useLoginStore } from "@/features/auth/model/login-store";
import { useProfileStore } from "@/features/profile";
import { IMessage } from "@/shared/types/message.interface";
import { IUser } from "@/shared/types/user.interface";
import { Container } from "@/shared/ui";
import { useEffect, useRef, useMemo } from "react";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}

function formatDateHeader(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDate.getTime() === today.getTime()) return "Сегодня";
  if (msgDate.getTime() === yesterday.getTime()) return "Вчера";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date); 
}

export const MessageList = ({ messages }: IMessagesListProps) => {
  const { user } = useLoginStore();
  const { handleOpen, setUser } = useProfileStore();
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

  const groupedMessages = useMemo(() => {
    if (!uniqueMessages || uniqueMessages.length === 0) return [];

    const sorted = [...uniqueMessages].sort((a, b) => {
      const dateA = new Date((a as IMessage).createdAt || 0).getTime();
      const dateB = new Date((b as IMessage).createdAt || 0).getTime();
      return dateA - dateB;
    });

    const groups: { dateStr: string; date: Date; messages: typeof sorted }[] = [];
    let currentDateKey = "";
    let currentGroup: (typeof groups)[0] | null = null;

    for (const msg of sorted) {
      const msgDate = new Date((msg as IMessage).createdAt || 0);
      const dayKey = `${msgDate.getFullYear()}-${msgDate.getMonth()}-${msgDate.getDate()}`;

      if (dayKey !== currentDateKey) {
        currentDateKey = dayKey;
        currentGroup = { dateStr: dayKey, date: msgDate, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup!.messages.push(msg);
    }
    return groups;
  }, [uniqueMessages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [uniqueMessages.length]);

  const handleOpenProfile = (profile: IUser) => {
    if (profile) setUser(profile);
    handleOpen();
  };

  return (
    <section ref={containerRef} className="overflow-y-auto custom-scroll">
      <Container mod="default" className="px-6.25">
        <div className="flex flex-col max-h-[calc(100vh-200px)] pt-6.25 after:block after:h-2.5 after:shrink-0">
          {groupedMessages.length === 0 ? (
            <p className="pt-10">Нет сообщений</p>
          ) : (
            groupedMessages.map((group) => (
              <div key={group.dateStr} className="flex flex-col">
                <div className="flex justify-center my-4">
                  <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    {formatDateHeader(group.date)}
                  </span>
                </div>

                <div className="flex flex-col gap-y-6.75">
                  {group.messages.map((message) => (
                    <MessageElement
                      key={message.id}
                      message={message}
                      userId={user?.id}
                      handleOpen={() => handleOpenProfile(message.user)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
};