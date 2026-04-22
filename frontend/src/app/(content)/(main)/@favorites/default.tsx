"use client";

import { useChatFavorites } from "@/entities/chat";
import { useLoginStore } from "@/features/auth";
import { ChatFavorites } from "@/widgets/chat-favorites";

export default function Page() {
  const { data: chatFavorites } = useChatFavorites();
  const { user } = useLoginStore(); 

  return <ChatFavorites chats={chatFavorites} user={user} />;
}
