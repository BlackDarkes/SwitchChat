import { apiClient } from "@/libs/api/clients";
import { TypeLoginSchema } from "../model/validate/login-schema";
import { TypeRegisterSchema } from "../model/validate/register-schema";
import { IUser } from "@/shared/types/user/user.interface";
import { IContact } from "@/shared/types/contact/contact.interface";
import { TypeProfileUpdateSchema } from "../model/validate/profile-update-schema";
import { extractData } from "@/shared/model/extract-data";

export const userApi = {
  login: async (
    data: TypeLoginSchema,
  ): Promise<{ message: string; user: IUser }> =>
    extractData(apiClient.auth.login(data)),

  register: async (data: TypeRegisterSchema): Promise<{ message: string }> =>
    extractData(apiClient.auth.register(data)),

  logout: async (): Promise<{ message: string }> =>
    extractData(apiClient.auth.logout()),

  me: async (): Promise<IUser> => extractData(apiClient.user.me()),

  search: async (search: string): Promise<IContact[]> =>
    extractData(apiClient.user.search({ search })),

  profileUpdate: async (data: TypeProfileUpdateSchema): Promise<IUser> =>
    extractData(apiClient.user.profileUpdate(data)),
};
