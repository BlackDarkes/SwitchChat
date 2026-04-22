"use client";

import { useBurgerStore, BurgerButton } from "@/features/burger-button";
import { SearchInput, useSearchChatStore } from "@/features/search";
import { ChangeEvent, useEffect, useState } from "react";
import { BurgerMenu } from "./burger/BurgerMenu";
import { BURGER_ITEMS } from "../model/burger-items";
import { Container } from "@/shared/ui";
import { useSettingsStore } from "@/features/settings";
import { useSearch } from "@/entities/chat";
import { useChatCreateStore } from "@/features/chat-create";
import { useMobileMessages } from "@/features/mobile-messages";

export const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { isOpen, handleOpen } = useBurgerStore();
  const { handleOpen: handleSettingsOpen } =
    useSettingsStore();
  const {
    setSearchResult,
    handleOpen: handleSearchOpen,
  } = useSearchChatStore();
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
      </Container>
    </header>
  );
};
