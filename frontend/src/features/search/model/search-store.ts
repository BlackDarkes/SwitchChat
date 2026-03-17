import { IChat } from "@/shared/types/chat.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ISearchStore {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  searchResult: IChat[];
  setSearchResult: (searchResult: IChat[]) => void;
}

export const useSearchStore = create<ISearchStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      searchResult: [],

      handleOpen: (open: boolean) => set({ isOpen: open }),
      setSearchResult: (searchResult: IChat[]) => set({ searchResult }),
    }),
    {
      name: "search",
    },
  ),
);
