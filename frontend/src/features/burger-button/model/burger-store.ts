import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IBurgerStore {
  isOpen: boolean;
  handleOpen: () => void;
}

export const useBurgerStore = create<IBurgerStore>()(
  devtools(
    (set) => ({
      isOpen: false,

      handleOpen: () => set((state) => ({ isOpen: !state.isOpen }))
    }),
    { name: "burger-store" }
  ),
)