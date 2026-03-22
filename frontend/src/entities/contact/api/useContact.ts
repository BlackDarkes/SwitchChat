import { useQuery } from "@tanstack/react-query"
import { contactApi } from "./contactApi"

export const useContact = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: () => contactApi.getContacts()
  })
}