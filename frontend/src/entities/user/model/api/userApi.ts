import { apiClient } from "@/libs/api/clients";
import { TypeLoginSchema } from "../validate/login-schema";
import { IUser } from "../types/user.interface";
import { TypeRegisterSchema } from "../validate/register-schema";

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

  me: async (id: string): Promise<IUser> => 
    extractData(apiClient.user.me(id)),
};
