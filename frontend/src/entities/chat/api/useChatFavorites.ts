import { useQuery } from "@tanstack/react-query"
import { chatApi } from "./chatApi"

export const useChatFavorites = () => {
  return useQuery({
    queryKey: ["chatFavorite"],
    queryFn: () => {
      return chatApi.getFavoriteChats();
    }
  })
}