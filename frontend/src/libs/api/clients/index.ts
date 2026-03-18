"use client";

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
    search: (params?: { search: string }) => baseClient.get(`${ENDPOINTS.chat.search}?query=${params?.search}`),
    create: (data: { type: "DIRECT" | "GROUP" | "CHANNEL"; name: string }) => baseClient.post(ENDPOINTS.chat.create, data),
  },
  message: {
    getHistory: (
      id: string,
      params?: { limit?: number; cursor?: string | null }
    ) => {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.cursor) queryParams.append('cursor', params.cursor);
      
      const qs = queryParams.toString();
      const url = `${ENDPOINTS.message.getHistory.replace(":id", id)}${qs ? `?${qs}` : ''}`;
      
      return baseClient.get(url);
    },
    send: (id: string, data: {  text: string }) =>
      baseClient.post(ENDPOINTS.message.send.replace(":id", id), data),
    update: (id: string) =>
      baseClient.put(ENDPOINTS.message.update.replace(":id", id)),
    delete: (id: string) =>
      baseClient.delete(ENDPOINTS.message.delete.replace(":id", id)),
    react: (id: string, emoji: string) =>
      baseClient.post(ENDPOINTS.message.react.replace(":id", id).replace(":emoji", emoji)),
  },
};
