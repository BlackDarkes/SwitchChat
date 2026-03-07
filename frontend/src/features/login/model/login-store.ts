/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TypeLoginSchema, type TypeRegisterSchema, type IUser } from "@/entities/user";
import { apiClient } from "@/libs/api/clients";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ILoginStore {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string;

  login: (user: TypeLoginSchema) => void;
  register: (user: TypeRegisterSchema) => void;
  logout: () => void;
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
          const { data: res  } = await apiClient.auth.login(data);
          set({ user: res.user, isAuth: true, isLoading: false });
          return res.message
        } catch(error: any) {
          const errorMessage = error?.response?.data?.message || error.message;
          set({ error: errorMessage });
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
      }
    }),
    {
      name: "login-store",
    },
  ),
);
