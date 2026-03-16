"use client";

import { TypeSendMessageSchema } from "@/entities/message/model/send-message-schema";
import { ENDPOINTS } from "../constants/endpoints";
import { baseClient } from "./base-client";

export const apiClient = {
  auth: {
    login: (data: { email: string; password: string }) =>
      baseClient.post(ENDPOINTS.auth.login, data),

    register: (data: { email: string; name: string; password: string }) =>
      baseClient.post(ENDPOINTS.auth.register, data),

    logout: () => baseClient.post(ENDPOINTS.auth.logout),

    refresh: () => baseClient.post(ENDPOINTS.auth.refresh),
  },
  user: {
    me: () => baseClient.get(ENDPOINTS.user.me),
  },
  chat: {
    getUserChat: () => baseClient.get(ENDPOINTS.chat.getUserChat),
    getChatById: (id: string) =>
      baseClient.get(ENDPOINTS.chat.getChatById.replace(":id", id)),
    getSelfChat: () => baseClient.get(ENDPOINTS.chat.getSelfChat),
    getDirectChats: () => baseClient.get(ENDPOINTS.chat.getDirectChats),
    getGroupChats: () => baseClient.get(ENDPOINTS.chat.getGroupChats),
  },
  message: {
    getHistory: (id: string) =>
      baseClient.get(ENDPOINTS.message.getHistory.replace(":id", id)),
    send: (id: string, data: TypeSendMessageSchema) =>
      baseClient.post(ENDPOINTS.message.send.replace(":id", id), data),
    update: (id: string) =>
      baseClient.put(ENDPOINTS.message.update.replace(":id", id)),
    delete: (id: string) =>
      baseClient.delete(ENDPOINTS.message.delete.replace(":id", id)),
    react: (id: string, emoji: string) =>
      baseClient.post(ENDPOINTS.message.react.replace(":id", id).replace(":emoji", emoji)),
  },
};
