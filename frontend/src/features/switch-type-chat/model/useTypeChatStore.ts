import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ITypeChatStore {
  type: "CHATS" | "GROUPS";
  setType: (type: "CHATS" | "GROUPS") => void;
}

export const useTypeChatStore = create<ITypeChatStore>()(
  devtools((set) => ({
    type: "CHATS",
    setType: (type) => set({ type }),
  })),
);
