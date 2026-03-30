import { contactApi } from "@/entities/contact"
import { queryClient } from "@/libs/query/query-client"
import { useMutation } from "@tanstack/react-query"

export const useContactAdd = () => {
  return useMutation({
    mutationKey: ["addContact"],
    mutationFn: async (contactId: string) => {
      await contactApi.addContact({ contactId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  })
}