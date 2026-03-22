import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IChatInfoStore {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useChatInfoStore = create<IChatInfoStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "Chat-info-modal",
    },
  ),
);
