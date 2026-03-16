import { apiClient } from "@/libs/api/clients";
import { IMessage } from "@/shared/types/message.interface";
import { TypeSendMessageSchema } from "../model/send-message-schema";

const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export const messageApi = {
  getHistory: async (id: string): Promise<IMessage[]> =>
    extractData(apiClient.message.getHistory(id)),

  send: async (id: string, data: TypeSendMessageSchema): Promise<IMessage> =>
    extractData(apiClient.message.send(id, data)),
};
