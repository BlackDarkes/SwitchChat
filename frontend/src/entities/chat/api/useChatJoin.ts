import { apiClient } from "@/libs/api/clients";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query"

export const useChatJoin = () => {
  return useMutation({
    mutationKey: ["joinChat"],
    mutationFn: async (id: string) => {
      await apiClient.chat.join(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
    },
  })
}