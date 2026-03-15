"use client";

import { useDirectChats, useGroupChats } from "@/entities/chat";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { ChatList } from "@/widgets/chat-list";

export default function DefaultContent() {
  const { type } = useTypeChatStore();

  const directChats = useDirectChats();
  const groupChats = useGroupChats();

  const { data, isPending } = type === "CHATS" ? directChats : groupChats;

  console.log("data", data, type);

  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}