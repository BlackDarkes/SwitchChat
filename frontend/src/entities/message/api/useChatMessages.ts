/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { messageApi } from "./messageApi";
import { useChatSocketSync } from "@/entities/chat/api/useChatSocketSync";
import { IMessage } from "@/shared/types/message.interface";
import { TypeSendMessageSchema } from "../model/send-message-schema";



export const useChatMessages = (chatId: string) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: () => messageApi.getHistory(chatId),
    initialPageParam: null,
    getNextPageParam: (last: any) => last.nextCursor,
    enabled: !!chatId,
  });

  useChatSocketSync(chatId);

  const sendMessage = async ( data: TypeSendMessageSchema): Promise<IMessage> => {
    const sent = await messageApi.send(chatId, data); 
    return sent;
  };

  return {
    messages: data?.pages.flatMap(p => p) ?? [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    sendMessage,
  };
};