"use client";

import { ChatCreateModal } from "@/features/chat-create";
import { ProfileModal } from "@/features/profile";
import { SearchModal } from "@/features/search";
import { SettingsModal } from "@/features/settings";
import { Toaster } from "sonner";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <ProfileModal />
      <ChatCreateModal />
      <SettingsModal />
      <SearchModal />
      <Toaster position="bottom-right" closeButton={true} duration={5000} />
    </>
  );
};
