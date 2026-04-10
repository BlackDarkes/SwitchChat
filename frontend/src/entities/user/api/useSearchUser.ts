import { IContact } from "@/shared/types/contact/contact.interface";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "./userApi";

export const useSearchUser = (search: string) => {
  return useQuery<IContact[]>({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search.trim()) {
        return [];
      }

      return userApi.search(search);
    },
  });
};
