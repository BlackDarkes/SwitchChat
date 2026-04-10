import { IContact } from "@/shared/types/contact/contact.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ISearchUserStore {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  searchResult: IContact[] | undefined;
  setSearchResult: (searchResult: IContact[] | undefined) => void;
}

export const useSearchUserStore = create<ISearchUserStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      handleOpen: (open: boolean) => set({ isOpen: open }),
      searchResult: undefined,
      setSearchResult: (searchResult: IContact[] | undefined) =>
        set({ searchResult }),
    }),
    { name: "search-user-store" },
  ),
);
