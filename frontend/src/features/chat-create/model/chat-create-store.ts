import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IChatCreateStore {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useChatCreateStore = create<IChatCreateStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "chat-create-store" },
  ),
);
