/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TypeLoginSchema, type TypeRegisterSchema, type IUser, userApi } from "@/entities/user";
import { apiClient } from "@/libs/api/clients";
import { IAuthUser } from "@/libs/auth/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ILoginStore {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string;

  login: (user: TypeLoginSchema) => Promise<void>;
  register: (user: TypeRegisterSchema) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  initialize: (user: IUser | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
}

export const useLoginStore = create<ILoginStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuth: false,
      isLoading: false,
      error: "",

      login: async (data: TypeLoginSchema) => {
        set({ isLoading: true, error: "" });
        try {
          const { message, user } = await userApi.login(data);
          set({ user, isAuth: true, isLoading: false });
          return message;
        } catch(error: any) {
          const errorMessage = error?.response?.data?.message || error.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (data: TypeRegisterSchema) => {
        set({ isLoading: true, error: "" });
        try {
          const { data: res  } = await apiClient.auth.register(data);
          set({  isLoading: false });
          return res.message
        } catch(error: any) {
          const errorMessage = error?.response?.data?.message || error.message;
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await apiClient.auth.logout();
        } finally {
          set({  user: null, isAuth: false });
        }
      },

      fetchUser: async () => {
        set({ isLoading: true, error: "" });
        try {
          const { data } = await apiClient.user.me();
          set({ user: data, isAuth: true, isLoading: false });
        } catch(error: any) {
          const errorMessage = error?.response?.data?.message || error.message;
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      initialize: (user: IAuthUser) => {
        set({ user, isAuth: true });
      }
    }),
    {
      name: "login-store",
    },
  ),
);
