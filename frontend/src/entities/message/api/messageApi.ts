import { apiClient } from "@/libs/api/clients";
import { IMessage } from "@/shared/types/message.interface";

const extractData = <T>(promise: Promise<{ data: T }>) => 
  promise.then((res) => res.data);

export const messageApi = {
  getMessagesByChatId: async (id: string): Promise<IMessage[]> => 
    extractData(apiClient.message.getHistory(id)),
};