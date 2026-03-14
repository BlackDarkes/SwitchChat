/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useDirectChats, useGroupChats } from "@/entities/chat";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { ChatList } from "@/widgets/chat-list";

export default function DefaultContent() {
  const { type } = useTypeChatStore();
  const { data, isPending } = type === "CHATS" ? useDirectChats() : useGroupChats();

  return (
    <>
      <ChatList chats={data} isPending={isPending} />
    </>
  );
}