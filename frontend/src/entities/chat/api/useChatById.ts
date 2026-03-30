import { useQuery } from "@tanstack/react-query"
import { chatApi } from "./chatApi";

export const useChatById = (id: string) => {
  return useQuery({
    queryKey: ["chatById", id],
    queryFn: async () => {
      return chatApi.getChatById(id);
    }
  })
}