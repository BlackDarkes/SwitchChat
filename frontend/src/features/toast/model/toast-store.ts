import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IToastStore {
  isOpen: boolean;
  message: string;
  type: "success" | "error";

  handleOpen: () => void;
  handleClose: () => void;
  setMessage: (message: string) => void;
  setType: (type: "success" | "error") => void;
}

export const useToastStore = create<IToastStore>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      message: "test message",
      type: "success",

      handleOpen: () => {
        set({ isOpen: true });
        setTimeout(() => {
          get().handleClose();
          setTimeout(() => set({ message: "" }), 500);
        }, 5000);
      },
      handleClose: () => {
        set({ isOpen: false });
        setTimeout(() => set({ message: "" }), 500);
      },
      setMessage: (message) => set({ message }),
      setType: (type) => set({ type }),
    }),
    {
      name: "toast-store",
    },
  ),
);
