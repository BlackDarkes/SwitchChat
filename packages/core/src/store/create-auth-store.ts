import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthApiService<TUser, TLoginData> {
  me: () => Promise<TUser>;
  login: (data: TLoginData) => Promise<{ user: TUser; message: string }>;
  logout: () => Promise<void>;
}

interface IAuthStore<TUser, TLoginData> {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;

  fetchUser: () => Promise<boolean>;
  login: (data: TLoginData) => Promise<string>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const authStoreLogic =
  <TUser, TLoginData>(
    api: IAuthApiService<TUser, TLoginData>,
  ): StateCreator<
    IAuthStore<TUser, TLoginData>,
    [["zustand/devtools", never]]
  > =>
  (set) => ({
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,

    fetchUser: async () => {
      set({ isLoading: true });
      try {
        const user = await api.me();
        set({ user, isAuth: true, error: null });
        return true;
      } catch {
        set({ user: null, isAuth: false });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    login: async (data: TLoginData) => {
      set({ isLoading: true });
      try {
        const res = await api.login(data);
        set({
          user: res.user,
          isAuth: true,
          error: null,
        });
        return res.message;
      } catch (error: any) {
        const errorMsg = error?.response?.data?.message || "Ошибка входа";
        set({ error: errorMsg });
        throw new Error(errorMsg);
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      try {
        await api.logout();
      } finally {
        set({ user: null, isAuth: false, error: null });
      }
    },

    clearError: () => set({ error: null }),
  });

export const createAuthStore = <TUser, TLoginData>(
  api: IAuthApiService<TUser, TLoginData>,
  storeName: string,
) => {
  return create<IAuthStore<TUser, TLoginData>>()(
    devtools(authStoreLogic(api), {
      name: storeName,
    }),
  );
};
