"use client";

import { useGroupChats } from "@/entities/chat";
import { ChatList } from "@/widgets/chat-list";

export default function Page() {
  const { data, isPending } = useGroupChats();

  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}