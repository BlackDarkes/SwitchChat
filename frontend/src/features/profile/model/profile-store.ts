import { IUser } from "@/shared/types/user.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IProfileStore {
  isOpen: boolean;
  user: IUser | undefined;

  handleOpen: () => void;
  setUser: (user: IUser | undefined) => void;
}

export const useProfileStore = create<IProfileStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      user: undefined,

      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

      setUser: (user: IUser | undefined) => set({ user }),
    }),
    { name: "profile-store" },
  ),
);
