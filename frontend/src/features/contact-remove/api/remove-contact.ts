import { contactApi } from "@/entities/contact";
import { queryClient } from "@/libs/query/query-client";
import { useMutation } from "@tanstack/react-query";

export const useContactRemove = () => {
  return useMutation({
    mutationKey: ["removeContact"],
    mutationFn: async (id: string) => {
      await contactApi.removeContact({ contactId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["searchContacts"] });
      queryClient.invalidateQueries({ queryKey: ["directChats"] });
    },
  });
};
