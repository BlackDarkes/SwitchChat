"use client"

import { ChatIsland } from "@/widgets/chat-island";
import { ChatList } from "@/widgets/chat-list";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-between h-full text-primary-color">
      <ChatList />
      <ChatIsland />
    </section>
  )
}