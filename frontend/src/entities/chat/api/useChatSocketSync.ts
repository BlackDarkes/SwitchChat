/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getSocket } from "@/shared/api/socket";
import { useSocketEvent } from "@/shared/lib/socket";
import { IMessage } from "@/shared/types/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatSocketSync = (chatId: string | null) => {
  const queryClient = useQueryClient();

  useSocketEvent('message_received', (message: IMessage) => {
    if (message.chatId !== chatId) return;
    
    queryClient.setQueryData(['messages', chatId], (old: any) => {
      if (!old?.pages) return old;
      return {
        ...old,
        pages: old.pages.map((page: any, i: number) =>
          i === 0
            ? { 
                ...page, 
                data: [message, ...page.data.filter((m: IMessage) => m.id !== message.id)] 
              }
            : page
        ),
      };
    });
    queryClient.invalidateQueries({ queryKey: ['chats'], refetchType: 'none' });
  }, [chatId, queryClient]);

  useSocketEvent('message_updated', (updated: IMessage) => {
    if (updated.chatId !== chatId) return;
    
    queryClient.setQueryData(['messages', chatId], (old: any) => {
      if (!old?.pages) return old;
      return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: page.data.map((msg: IMessage) => msg.id === updated.id ? updated : msg),
        })),
      };
    });
  }, [chatId, queryClient]);

  useSocketEvent('message_deleted', ({ messageId }: { messageId: string }) => {
    if (!chatId) return;
    
    queryClient.setQueryData(['messages', chatId], (old: any) => {
      if (!old?.pages) return old;
      return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((msg: IMessage) => msg.id !== messageId),
        })),
      };
    });
  }, [chatId, queryClient]);

  useEffect(() => {
    if (!chatId) return;
    try {
      const socket = getSocket();
      socket.emit('join_room', chatId);
      return () => { socket.emit('leave_room', chatId); };
    } catch { /*  */ }
  }, [chatId]);
};