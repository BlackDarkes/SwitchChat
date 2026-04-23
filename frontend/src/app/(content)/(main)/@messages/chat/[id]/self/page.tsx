"use client";

import { chatApi } from "@/entities/chat";
import { useChatMessages } from "@/entities/message";
import { useMobileMessages } from "@/features/mobile-messages";
import { IChat } from "@/shared/types";
import { MessageField } from "@/widgets/message-field";
import { MessageList } from "@/widgets/message-list";
import { MessageTitleSelf } from "@/widgets/message-titles";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [chat, setChat] = useState<IChat | undefined>();
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const searchRef = useRef(true);

  useEffect(() => {
    if (searchRef.current) {
      handleMobileMessagesOpen(true);
    }

    const fetchChat = async () => {
      const selfChat = await chatApi.getSelfChat();

      setChat(selfChat);
    };

    fetchChat();

    return () => {
      searchRef.current = false;
    };
  }, [handleMobileMessagesOpen]);

  const chatId = chat?.id ?? "";

  const { messages } = useChatMessages(chatId);

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Загрузка чата...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <MessageTitleSelf />
        <MessageList messages={messages} />
      </div>
      <MessageField />
    </>
  );
}
