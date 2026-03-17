import { useQuery } from "@tanstack/react-query"
import { messageApi } from "./messageApi"

export const useMessages = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => messageApi.getHistory(id)
  })
}