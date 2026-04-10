import { apiClient } from "@/libs/api/clients";
import { IContact } from "@/shared/types/contact/contact.interface";

const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

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
