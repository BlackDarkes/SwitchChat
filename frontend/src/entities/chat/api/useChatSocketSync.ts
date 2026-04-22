"use client";

import { getSocket } from "@/shared/api/socket";
import { useSocketEvent } from "@/shared/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoginStore } from "@/features/auth";
import { IMessage } from "@/shared/types";

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
  const { user } = useLoginStore();

  useSocketEvent(
    "message_received",
    (message: IMessage) => {
      if (message.userId === user?.id) {
        console.log("⏭️ Skipping own message from socket:", message.id);
        return;
      }

      if (!chatId || message.chatId !== chatId) return;

      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page, i: number) => {
              if (i === 0) {
                const currentData = page.data || [];

                const exists = currentData.some((m) => m.id === message.id);
                if (exists) {
                  console.log("⏭️ Skipping duplicate message:", message.id);
                  return page;
                }

                return { ...page, data: [...currentData, message] };
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
    [chatId, queryClient, user?.id],
  );

  useSocketEvent(
    "message_updated",
    (updated: IMessage) => {
      if (!chatId || updated.chatId !== chatId) return;

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
