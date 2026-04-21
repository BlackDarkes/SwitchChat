"use client";

import { apiClient } from "@/libs/api/clients";
import { TypeCreateChatSchema } from "../model/validate/create-chat-schema";
import { IChat, IChatMember } from "@/shared/types";
import { extractData } from "@/shared/model/extract-data";
import { TypeUpdateChatSchema } from "../model/validate/update-chat-schema";

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

  getFavoriteChats: async (): Promise<IChat[] & IChatMember[]> =>
    extractData(apiClient.chat.getFavoriteChats()),

  search: async (search: string): Promise<IChat[]> =>
    extractData(apiClient.chat.search({ search })),

  create: async (
    data: TypeCreateChatSchema,
  ): Promise<{ chat: IChat; message: string }> =>
    extractData(apiClient.chat.create(data)),

  update: async (id: string, data: TypeUpdateChatSchema): Promise<IChat> =>
    extractData(apiClient.chat.update(id, data)),

  join: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.join(id)),

  leave: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.leave(id)),

  addFavorite: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.addFavorite(id)),

  removeFavorite: async (id: string): Promise<IChat> =>
    extractData(apiClient.chat.removeFavorite(id)),
};
