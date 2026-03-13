import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMobileMessages {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useMobileMessages = create<IMobileMessages>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "mobile-messages" },
  ),
);
