import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IChatActionMenuStore {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useChatActionMenuStore = create<IChatActionMenuStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "chat-action-menu-store",
    },
  ),
);
