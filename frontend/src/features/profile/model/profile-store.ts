import { IUser } from "@/shared/types/user/user.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IProfileStore {
  isOpen: boolean;
  user: IUser | undefined;
  isMyProfile: boolean;

  openProfile: (user: IUser | undefined, isMy: boolean) => void;
  closeProfile: () => void;
}

export const useProfileStore = create<IProfileStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      user: undefined,
      isMyProfile: false,

      openProfile: (user, isMy) => set({ isOpen: true, user, isMyProfile: isMy }),
      closeProfile: () => set({ isOpen: false }),
    }),
    { name: "profile-store" },
  ),
);