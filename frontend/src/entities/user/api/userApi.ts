import { apiClient } from "@/libs/api/clients";
import { TypeLoginSchema } from "../model/validate/login-schema";
import { IUser } from "../model/types/user.interface";
import { TypeRegisterSchema } from "../model/validate/register-schema";

const extractData = <T>(promise: Promise<{ data: T }>): Promise<T> =>
  promise.then(({ data }) => data);

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
};
