"use client";

import { useMobileMessages } from "@/features/mobile-messages";
import { ProfileModal, useProfileStore } from "@/features/profile";
import { cn } from "@/shared/lib/utils";
import { ChatIsland } from "@/widgets/chat-island";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
  chats,
  messages,
  favorites,
}: {
  children: React.ReactNode;
  chats: React.ReactNode;
  messages: React.ReactNode;
  favorites: React.ReactNode;
}) {
  const { isOpen } = useMobileMessages();
  const {
    isOpen: profileIsOpen,
    user,
    isMyProfile,
    closeProfile,
  } = useProfileStore();
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const pathName = usePathname();

  useEffect(() => {
    if (!pathName.includes("chat")) {
      handleMobileMessagesOpen(false);
      console.log("WORK");
    }
  }, [pathName, handleMobileMessagesOpen]);

  return (
    <main
      className={cn(
        "flex",
        "max-h-dvh h-dvh max-w-screen w-screen",
        "overflow-hidden",
      )}
    >
      <section
        className={cn(
          "shrink-0",
          "w-[clamp(400px,45vw,760px)] bg-primary-bg border-r-2 border-border-color",
          "max-md:w-full",
        )}
      >
        {children}
        <div className={cn("flex h-full", "max-md:flex-col")}>
          {favorites}
          <div
            className={cn(
              "flex flex-col items-center justify-between",
              "h-[calc(100%-clamp(83px,10vh,86px))] w-full text-primary-color",
              "max-md:h-[calc(100%-170px)]",
            )}
          >
            {chats}
            <ChatIsland />
          </div>
        </div>
      </section>

      <aside
        className={cn(
          "flex flex-col justify-between",
          "w-[max(100%,1160px)] h-dvh bg-accent-bg transition-all duration-300 ",
          "max-md:fixed max-md:top-0 max-md:right-0 max-md:w-full max-md:-translate-x-[105%] max-md:z-600",
          {
            "max-md:translate-x-0 ": isOpen,
          },
        )}
      >
        {messages}
      </aside>

      <ProfileModal
        user={user}
        isOpen={profileIsOpen}
        isMyProfile={isMyProfile}
        handleOpen={closeProfile}
      />
    </main>
  );
}
