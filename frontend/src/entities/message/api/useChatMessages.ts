"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { messageApi } from "./messageApi";
import { useChatSocketSync } from "@/entities/chat/api/useChatSocketSync";
import { IMessage } from "@/shared/types";
import { TypeSendMessageSchema } from "../model/validate/send-message-schema";
import { useLoginStore } from "@/features/auth/model/login-store";

interface MessagesPageData {
  data: IMessage[];
  nextCursor: string | undefined;
}

interface MessagesInfiniteData {
  pages: MessagesPageData[];
  pageParams: (string | undefined)[];
}

export const useChatMessages = (chatId: string) => {
  const queryClient = useQueryClient();
  const { user } = useLoginStore();

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["messages", chatId],
    queryFn: ({ pageParam }) =>
      messageApi.getHistory(chatId, {
        limit: 50,
        cursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!chatId,
  });

  useChatSocketSync(chatId);

  const sendMessage = async (
    data: TypeSendMessageSchema,
  ): Promise<IMessage> => {
    if (!chatId) {
      console.error("❌ Cannot send message: chatId is empty");
      throw new Error("Chat ID is required");
    }

    const tempId = `temp_${Date.now()}`;

    const optimisticMessage: IMessage = {
      id: tempId,
      userId: user?.id || "",
      chatId,
      text: data.text,
      type: "TEXT",
      isEdited: false,
      replyToId: "",
      isPined: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: user!,
    };

    queryClient.setQueryData<MessagesInfiniteData>(
      ["messages", chatId],
      (old) => {
        if (!old?.pages) {
          return {
            pages: [{ data: [optimisticMessage], nextCursor: undefined }],
            pageParams: [undefined],
          };
        }
        return {
          ...old,
          pages: old.pages.map((page, i: number) =>
            i === 0
              ? { ...page, data: [...(page.data || []), optimisticMessage] }
              : page,
          ),
        };
      },
    );

    try {
      const sent = await messageApi.send(chatId, data);

      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: (page.data || [])
                .filter((msg) => msg.id !== tempId)
                .concat(sent),
            })),
          };
        },
      );

      return sent;
    } catch (error) {
      queryClient.setQueryData<MessagesInfiniteData>(
        ["messages", chatId],
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: (page.data || []).map((msg) =>
                msg.id === tempId ? { ...msg, isEdited: false } : msg,
              ),
            })),
          };
        },
      );
      throw error;
    }
  };

  const messages = data?.pages.flatMap((p) => p.data || []) ?? [];

  return {
    messages,
    isLoading,
    hasNextPage,
    fetchNextPage,
    sendMessage,
  };
};
