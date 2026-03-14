"use client";

import { useDirectChats } from "@/entities/chat";
import { ChatList } from "@/widgets/chat-list";

export default function Page() {
  const { data, isPending } = useDirectChats();
  
  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}