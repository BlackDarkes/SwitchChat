import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMessageInfoStore {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useMessageInfoStore = create<IMessageInfoStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "message-info-modal",
    },
  ),
);
