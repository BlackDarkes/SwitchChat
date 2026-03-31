import { chatApi } from "@/entities/chat";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query";

export const useChatJoin = () => {
  return useMutation({
    mutationKey: ["joinChat"],
    mutationFn: async (id: string) => {
      await chatApi.join(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["chatMembers"] });
      queryClient.invalidateQueries({ queryKey: ["chatById"] })
    },
  })
}