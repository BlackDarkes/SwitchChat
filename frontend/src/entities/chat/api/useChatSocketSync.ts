"use client";

import { getSocket } from "@/shared/api/socket";
import { useSocketEvent } from "@/shared/lib/socket";
import { IMessage } from "@/shared/types/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface MessagesPageData {
  data: IMessage[];
  nextCursor: string | undefined;
}

interface MessagesInfiniteData {
  pages: MessagesPageData[];
  pageParams: (string | undefined)[];
}

export const useChatSocketSync = (chatId: string | null) => {
  const queryClient = useQueryClient();

  useSocketEvent(
    "message_received",
    (message: IMessage) => {
      if (message.chatId !== chatId) return;

      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page, i: number) => {
              const currentData = page.data || [];
              if (i === 0) {
                const filtered = currentData.filter((m) => m.id !== message.id);
                return { ...page, data: [message, ...filtered] };
              }
              return page;
            }),
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "none",
      });
    },
    [chatId, queryClient],
  );

  useSocketEvent(
    "message_updated",
    (updated: IMessage) => {
      if (updated.chatId !== chatId) return;
      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => {
              const currentData = page.data || [];
              return {
                ...page,
                data: currentData.map((msg) =>
                  msg.id === updated.id ? updated : msg,
                ),
              };
            }),
          };
        },
      );
    },
    [chatId, queryClient],
  );

  useSocketEvent(
    "message_deleted",
    ({ messageId }: { messageId: string }) => {
      if (!chatId) return;
      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => {
              const currentData = page.data || [];
              return {
                ...page,
                data: currentData.filter((msg) => msg.id !== messageId),
              };
            }),
          };
        },
      );
    },
    [chatId, queryClient],
  );

  useEffect(() => {
    if (!chatId) return;
    try {
      const socket = getSocket();
      socket.emit("join_room", chatId);
      return () => {
        socket.emit("leave_room", chatId);
      };
    } catch {}
  }, [chatId]);
};
