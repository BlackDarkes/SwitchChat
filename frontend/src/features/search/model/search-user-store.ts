import { IUser } from "@/shared/types/user.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ISearchUserStore {
  isOpen: boolean;
  handleOpen: () => void;
  searchResult: IUser[] | undefined;
  setSearchResult: (searchResult: IUser[] | undefined) => void;
}

export const useSearchUserStore = create<ISearchUserStore>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      handleOpen: () => set({ isOpen: !get().isOpen }),
      searchResult: undefined,
      setSearchResult: (searchResult: IUser[] | undefined) =>
        set({ searchResult }),
    }),
    { name: "search-user-store" },
  ),
);
