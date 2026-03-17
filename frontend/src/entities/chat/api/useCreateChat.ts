import { useMutation } from "@tanstack/react-query"
import { TypeCreateChatSchema } from "../model/create-chat-schema"
import { apiClient } from "@/libs/api/clients"
import { queryClient } from "@/libs/query/query-client"

export const useCreateChat = () => {
  return useMutation({
    mutationKey: ["createChat"],
    mutationFn: async (data: TypeCreateChatSchema) => apiClient.chat.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({  queryKey: ["chats"] });
    },
  })
}