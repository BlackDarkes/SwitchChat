"use client";

import { chatApi } from "@/entities/chat";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { useLoginStore } from "@/features/auth/model/login-store";
import { IChat } from "@/shared/types/chat.interface";
import { MessageField } from "@/widgets/message-field/ui/MessageField";
import { MessageList } from "@/widgets/message-list";
import { MessageTitle } from "@/widgets/message-title";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [chat, setChat] = useState<IChat | undefined>();
  const { messages } = useChatMessages(id);
  const { user } = useLoginStore();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await chatApi.getChatById(id);
      setChat(chat);
    };

    if (id) {
      fetchChat();
    }
  }, [id]);

  if (
    chat?.type === "SELF" &&
    chat.chatMembers.some((member) => member.userId === user?.id)
  ) {
    return redirect(`/chat/${id}/self`);
  }

  return (
    <>
      <div>
        <MessageTitle chat={chat} />
        <MessageList messages={messages} />
      </div>
      {chat?.chatMembers.some((member) => member.userId === user?.id) ? (
        <MessageField />
      ) : chat?.type === "CHANNEL" &&
        chat?.chatMembers.some((member) => member.userId === user?.id) ? (
        "УВЕДОМЛЕНИЯ"
      ) : (
        "ПРИСОЕДИНИТЬСЯ"
      )}
    </>
  );
}
