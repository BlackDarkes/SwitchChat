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