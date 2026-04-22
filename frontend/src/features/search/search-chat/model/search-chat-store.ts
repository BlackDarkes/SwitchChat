
import { IChat } from "@/shared/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ISearchChatStore {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  searchResult: IChat[];
  setSearchResult: (searchResult: IChat[]) => void;
}

export const useSearchChatStore = create<ISearchChatStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      searchResult: [],

      handleOpen: (open: boolean) => set({ isOpen: open }),
      setSearchResult: (searchResult: IChat[]) => set({ searchResult }),
    }),
    {
      name: "search-chat-store",
    },
  ),
);
