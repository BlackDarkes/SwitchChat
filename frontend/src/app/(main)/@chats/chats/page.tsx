"use client";

import { useDirectChats } from "@/entities/chat";
import { ChatList, ChatListSkeleton } from "@/widgets/chat-list";

export default function Page() {
  const { data, isPending } = useDirectChats();

  if (isPending) return <ChatListSkeleton />;
  
  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}