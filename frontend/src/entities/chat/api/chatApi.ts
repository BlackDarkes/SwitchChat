import { apiClient } from "@/libs/api/clients";
import { IChat } from "@/shared/types/chat.interface";

const extractData = <T>(promise: Promise<{ data: T }>) => 
  promise.then((res) => res.data);

export const chatApi = {
  getUserChats: async (): Promise<{ chats: IChat[] }> =>
    extractData(apiClient.chat.getUserChat()),
}