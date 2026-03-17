import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IProfileStore {
  isOpen: boolean;
  handleOpen: () => void
}

export const useSettingsStore = create<IProfileStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "settings",
    }
  )
);