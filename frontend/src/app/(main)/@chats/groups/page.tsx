"use client";

import { useGroupChats } from "@/entities/chat";
import { ChatList, ChatListSkeleton } from "@/widgets/chat-list";

export default function Page() {
  const { data, isPending } = useGroupChats();

  if (isPending) return <ChatListSkeleton />;

  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}