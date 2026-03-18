"use client";

import { ChatCreateModal, CreateChatButton, useChatCreateStore } from "@/features/chat-create";

export default function Sidebar() {
  const { handleOpen } = useChatCreateStore();

  return (
    <div className="flex items-center justify-center h-full text-inactive-color text-[clamp(18px,1.4vw,22px)]">
      <p>Выберите чат, чтобы начать общение</p>
      <ChatCreateModal />
      <CreateChatButton onClick={handleOpen} />
    </div>
  );
}