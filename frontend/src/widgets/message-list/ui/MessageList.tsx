"use client";

import { MessageElement } from "@/entities/message";
import { useLoginStore } from "@/features/auth";
import { useProfileStore } from "@/features/profile";
import { formatDate } from "@/shared/model/format-date";
import { IMessage } from "@/shared/types";
import { IUser } from "@/shared/types/user/user.interface";
import { Container } from "@/shared/ui";
import { useEffect, useRef, useMemo } from "react";

interface IMessagesListProps {
  messages: IMessage[] | undefined;
}

export const MessageList = ({ messages }: IMessagesListProps) => {
  const { user } = useLoginStore();
  const { openProfile } = useProfileStore();
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

    const groups: { dateStr: string; date: Date; messages: typeof sorted }[] =
      [];
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
    openProfile(profile, false);
  };

  return (
    <section ref={containerRef} className="overflow-y-auto custom-scroll h-[calc(100dvh-200px)]">
      <Container mod="default">
        <div className="flex flex-col max-h-[calc(100dvh-200px)] pt-6.25 after:block after:h-2.5 after:shrink-0">
          {groupedMessages.length === 0 ? (
            <p className="pt-10">Нет сообщений</p>
          ) : (
            groupedMessages.map((group) => (
              <div key={group.dateStr} className="flex flex-col">
                <div className="flex justify-center my-4">
                  <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    {formatDate(group.date)}
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
