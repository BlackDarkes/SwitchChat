"use client";

import { useChatFavorites } from "@/entities/chat/api/useChatFavorites";
import { useMobileMessages } from "@/features/mobile-messages";
import { Toast, useToastStore } from "@/features/toast";
import { cn } from "@/shared/lib/utils";
import { ChatIsland } from "@/widgets/chat-island";

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
  const { data: chatFavorites } = useChatFavorites();
  const { isOpen: toastIsOpen, message, type, handleClose } = useToastStore();

  return (
    <main className="flex max-h-screen h-screen max-w-screen w-screen overflow-hidden">
      <section className="shrink-0 w-[clamp(400px,45vw,760px)] bg-primary-bg border-r-2 border-border-color max-md:w-full">
        {children}
        <div className="flex h-full">
          <div
            className={cn(`w-20 bg-accent-bg py-5`, {
              hidden: !chatFavorites?.length,
            })}
          >
            {favorites}
          </div>
          <div className="flex flex-col items-center justify-between text-primary-color h-[calc(100%-clamp(83px,10vh,86px))] w-full">
            {chats}
            <ChatIsland />
          </div>
        </div>
      </section>

      <aside
        className={cn(
          "flex flex-col justify-between",
          "w-[max(100%,1160px)] max-h-screen bg-accent-bg",
          "max-md:fixed max-md:top-0 max-md:right-0 max-md:w-full max-md:h-full max-md:-translate-x-[105%]",
          {
            "max-md:translate-x-0 max-md:z-600": isOpen,
          },
        )}
      >
        {messages}
      </aside>

      <Toast
        isOpen={toastIsOpen}
        message={message}
        type={type}
        handleClose={handleClose}
      />
    </main>
  );
}
