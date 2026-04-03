import { chatApi } from "@/entities/chat";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query"

export const useRemoveFavorite = () => {
  return useMutation({
    mutationKey: ["removeFavorite"],
    mutationFn: async (id: string) => {
      await chatApi.removeFavorite(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatFavorite"] });
    },
  })
}