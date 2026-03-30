import { IContact } from "@/shared/types/contact.interface"
import { useQuery } from "@tanstack/react-query"
import { contactApi } from "./contactApi"

export const useSearchContact = (search: string) => {
  return useQuery<IContact[]>({
    queryKey: ["searchContact", search],
    queryFn: async () => {
      if (!search.trim()) {
        return []
      }

      return contactApi.search(search);
    }
  })
}