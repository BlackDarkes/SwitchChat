import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/libs/api/clients";
import { queryClient } from "@/libs/query/query-client";
import { IChat } from "@/shared/types/chat.interface";
import { TypeCreateChatSchema } from "@/entities/chat";

export const useCreateChat = () => {
  return useMutation<IChat, Error, TypeCreateChatSchema>({
    mutationKey: ["createChat"],
    mutationFn: async (data: TypeCreateChatSchema) => {
      const res = await apiClient.chat.create(data);
      return res.data.chat;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
    },
  });
};
