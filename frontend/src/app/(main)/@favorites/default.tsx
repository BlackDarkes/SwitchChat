"use client";

import { useChatFavorites } from "@/entities/chat/api/useChatFavorites";
import { ChatFavorites } from "@/widgets/chat-favorites";

export default function Page() {
  const { data: chatFavorites } = useChatFavorites();

  return <ChatFavorites chats={chatFavorites} />;
}
