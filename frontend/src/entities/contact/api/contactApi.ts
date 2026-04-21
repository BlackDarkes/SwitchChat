import { apiClient } from "@/libs/api/clients";
import { extractData } from "@/shared/model/extract-data";
import { IContact } from "@/shared/types/contact/contact.interface";

export const contactApi = {
  getContacts: async (): Promise<IContact[]> =>
    extractData(apiClient.contact.getContacts()),

  search: async (search: string): Promise<IContact[]> =>
    extractData(apiClient.contact.search({ search })),

  addContact: async (data: { contactId: string }) =>
    extractData(apiClient.contact.addContact(data)),

  removeContact: async (data: { contactId: string }) =>
    extractData(apiClient.contact.removeContact(data)),
};
