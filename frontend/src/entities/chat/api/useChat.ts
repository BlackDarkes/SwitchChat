"use client";

import { useQuery } from "@tanstack/react-query"
import { chatApi } from "./chatApi"
import { IChat } from "@/shared/types/chat.interface"

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => chatApi.getUserChats() as Promise<{ chats: IChat[]}>,
    placeholderData: (prevData) => prevData // placeholder что бы не моргало
  })
}

export const useSelfChat = () => {
  return useQuery({
    queryKey: ["selfChat"],
    queryFn: () => chatApi.getSelfChat() as Promise<IChat>,
    placeholderData: (prevData) => prevData // placeholder что бы не моргало
  })
}

export const useDirectChats = () => {
  return useQuery({
    queryKey: ["directChats"],
    queryFn: () => chatApi.getDirectChats() as Promise<IChat[]>,
    placeholderData: (prevData) => prevData // placeholder что бы не моргало
  })
}

export const useGroupChats = () => {
  return useQuery({
    queryKey: ["groupChats"],
    queryFn: () => chatApi.getGroupChats() as Promise<IChat[]>,
    placeholderData: (prevData) => prevData // placeholder что бы не моргало
  })
}
