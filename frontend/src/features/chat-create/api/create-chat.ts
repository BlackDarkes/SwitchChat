import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/libs/query/query-client";
import { chatApi, TypeCreateChatSchema } from "@/entities/chat";
import { IChat } from "@/shared/types";

export const useCreateChat = () => {
  return useMutation<{ chat: IChat, message: string }, Error, TypeCreateChatSchema>({
    mutationKey: ["createChat"],
    mutationFn: async (data: TypeCreateChatSchema) => {
      const res = await chatApi.create(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
    },
  });
};
