"use client";

import { chatApi } from "@/entities/chat";
import { messageApi } from "@/entities/message";
import { IChat } from "@/shared/types/chat.interface";
import { IMessage } from "@/shared/types/message.interface";
import { MessagesList } from "@/widgets/message-list/ui/MessagesList";
import { MessageTitle } from "@/widgets/message-title";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await chatApi.getChatById(id);
      const messages = await messageApi.getMessagesByChatId(id);
      setChat(chat);
      setMessages(messages)
    };

    if (id) {
      fetchChat();
    }
  }, [id])

  console.log("Messages", messages)

  return (
    <>
      <MessageTitle chat={chat} />
      <MessagesList messages={messages} />
    </>
  );
}