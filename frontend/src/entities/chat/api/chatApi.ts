"use client";

import { apiClient } from "@/libs/api/clients";
import { IChat } from "@/shared/types/chat.interface";
import { TypeCreateChatSchema } from "../model/create-chat-schema";

const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export const chatApi = {
  getUserChats: async (): Promise<{ chats: IChat[] }> =>
    extractData(apiClient.chat.getUserChat()),

  getChatById: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.getChatById(id)),

  getSelfChat: async (): Promise<IChat> =>
    extractData(apiClient.chat.getSelfChat()),

  getDirectChats: async (): Promise<IChat[]> =>
    extractData(apiClient.chat.getDirectChats()),

  getGroupChats: async (): Promise<IChat[]> =>
    extractData(apiClient.chat.getGroupChats()),

  getFavoriteChats: async (): Promise<IChat[]> =>
    extractData(apiClient.chat.getFavoriteChats()),

  search: async (search: string): Promise<IChat[]> =>
    extractData(apiClient.chat.search({ search })),

  create: async (data: TypeCreateChatSchema): Promise<IChat> =>
    extractData(apiClient.chat.create(data)),

  join: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.join(id)),

  leave: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.leave(id)),

  addFavorite: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.addFavorite(id)),

  removeFavorite: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.removeFavorite(id)),
};
