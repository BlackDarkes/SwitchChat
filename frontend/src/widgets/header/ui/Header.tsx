"use client";

import { useBurgerStore } from "@/features/burger-button/model/burger-store";
import { BurgerButton } from "@/features/burger-button/ui/BurgerButton";
import { SearchInput, SearchModal } from "@/features/search";
import { ChangeEvent, useEffect, useState } from "react";
import { BurgerMenu } from "./burger/BurgerMenu";
import { BURGER_ITEMS } from "../model/burger-items";
import { Container } from "@/shared/ui";
import { SettingsModal, useSettingsStore } from "@/features/settings";
import { useSearchStore } from "@/features/search/model/search-store";
import { useSearch } from "@/entities/chat";
import { ChatCreateModal, useChatCreateStore } from "@/features/chat-create";
import { useMobileMessages } from "@/features/mobile-messages";

export const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { isOpen, handleOpen } = useBurgerStore();
  const { isOpen: isOpenSettings, handleOpen: handleSettingsOpen } =
    useSettingsStore();
  const {
    setSearchResult,
    searchResult,
    isOpen: isOpenSearch,
    handleOpen: handleSearchOpen,
  } = useSearchStore();
  const { handleOpen: handleCreateChatOpen } = useChatCreateStore();
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const { data: search } = useSearch(searchInput);

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResult([]);
      handleSearchOpen(false);
      return;
    }

    if (searchInput.trim()) {
      setSearchResult(search || []);
    }
  }, [searchInput, setSearchResult, handleSearchOpen, search]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <header className="py-5 w-[min(100%,760px)] h-[clamp(83px,11vh,86px)] bg-primary-bg border-b-2 border-border-color">
      <Container className="relative flex items-center justify-between gap-x-5">
        <div>
          <BurgerButton isOpen={isOpen} handleOpen={handleOpen} />
          <BurgerMenu
            items={BURGER_ITEMS}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleSettingsOpen={handleSettingsOpen}
            handleCreateChatOpen={handleCreateChatOpen}
            handleMobileMessagesOpen={handleMobileMessagesOpen}
          />
        </div>
        <SearchInput
          id="test"
          value={searchInput}
          handleInput={handleInput}
          handleOpen={handleSearchOpen}
        />

        <SearchModal
          chats={searchResult || []}
          isOpen={isOpenSearch}
          handleOpen={handleSearchOpen}
          setSearchInput={setSearchInput}
        />

        <ChatCreateModal />
      </Container>
      <SettingsModal isOpen={isOpenSettings} handleOpen={handleSettingsOpen} />
    </header>
  );
};
