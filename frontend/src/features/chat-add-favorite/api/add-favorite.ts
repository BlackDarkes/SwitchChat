import { chatApi } from "@/entities/chat";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query"

export const useAddFavorite = () => {
  return useMutation({
    mutationKey: ["addFavorite"],
    mutationFn: async (id: string) => {
      await chatApi.addFavorite(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatFavorite"] });
    },
  })
}