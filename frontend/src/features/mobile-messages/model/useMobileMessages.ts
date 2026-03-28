import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IMobileMessages {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
}

export const useMobileMessages = create<IMobileMessages>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: (open: boolean) => set({ isOpen: open }),
    }),
    { name: "mobile-messages" },
  ),
);
