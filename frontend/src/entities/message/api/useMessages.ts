import { useQuery } from "@tanstack/react-query"
import { messageApi } from "./messageApi"
import { IMessage } from "@/shared/types/message.interface"

export const useMessages = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => messageApi.getMessagesByChatId(id) as Promise<IMessage[]>
  })
}