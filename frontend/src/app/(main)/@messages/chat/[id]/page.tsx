"use client";

import { chatApi } from "@/entities/chat";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { IChat } from "@/shared/types/chat.interface";
import { MessageField } from "@/widgets/message-field/ui/MessageField";
import { MessageList } from "@/widgets/message-list";
import { MessageTitle } from "@/widgets/message-title";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useState<IChat | undefined>();
  const { messages } = useChatMessages(id);

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
      <div>
        <MessageTitle chat={chat} />
        <MessageList messages={messages} />
      </div>
      <MessageField />
    </>
  );
}
