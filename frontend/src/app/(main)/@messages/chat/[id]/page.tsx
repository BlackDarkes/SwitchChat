"use client";

import { chatApi } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { MessagesList } from "@/widgets/message-list/ui/MessagesList";
import { MessageTitle } from "@/widgets/message-title";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useState<IChat | undefined>();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await chatApi.getChatById(id);
      setChat(chat);
    };

    if (id) {
      fetchChat();
    }
  }, [id]);
  
  return (
    <>
      <MessageTitle chat={chat} />
      <MessagesList chat={chat} />
    </>
  );
}
