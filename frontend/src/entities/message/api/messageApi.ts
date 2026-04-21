/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/libs/api/clients";
import { TypeSendMessageSchema } from "../model/validate/send-message-schema";
import { IMessage } from "@/shared/types";
import { extractData } from "@/shared/model/extract-data";

export const messageApi = {
  getHistory: async (
    id: string,
    params?: { cursor?: string | null; limit?: number },
  ): Promise<{ data: IMessage[]; nextCursor: string | null }> => {
    const response = await extractData(
      apiClient.message.getHistory(id, params),
    );

    return {
      data: Array.isArray(response) ? response : (response as any).data || [],
      nextCursor:
        (response as any).nextCursor || (response as any).next_cursor || null,
    };
  },

  send: async (id: string, data: TypeSendMessageSchema): Promise<IMessage> =>
    extractData(apiClient.message.send(id, data)),
};
