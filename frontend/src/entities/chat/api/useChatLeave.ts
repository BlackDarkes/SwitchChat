import { apiClient } from "@/libs/api/clients";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query"

export const useChatLeave = () => {
  return useMutation({
    mutationKey: ["leaveChat"],
    mutationFn: async (id: string) => {
      await apiClient.chat.leave(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
    },
  })
}