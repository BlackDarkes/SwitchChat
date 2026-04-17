"use client";

import { useChatById } from "@/entities/chat";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { useLoginStore } from "@/features/auth/model/login-store";
import { ButtonChatJoin } from "@/features/chat-join";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { MessageSubscription } from "@/shared/ui";
import { MessageField } from "@/widgets/message-field/ui/MessageField";
import { MessageList } from "@/widgets/message-list";
import { MessageTitle, MessageTitleDirect } from "@/widgets/message-title";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { messages } = useChatMessages(id);
  const { user } = useLoginStore();
  const { data: chat } = useChatById(id);
  const { setType } = useTypeChatStore();

  useEffect(() => {
    if (chat?.type === "DIRECT") {
      setType("CHATS");
    } else if (chat?.type === "GROUP") {
      setType("GROUPS");
    }
  }, [chat?.type, setType]);

  if (
    chat?.type === "SELF" &&
    chat.chatMembers.some((member) => member.userId === user?.id)
  ) {
    return redirect(`/chat/${id}/self`);
  }

  return (
    <>
      {chat?.type !== "DIRECT" ? (
        <>
          <div>
            <MessageTitle chat={chat} />
            <MessageList messages={messages} />
          </div>
          {(chat?.type === "CHANNEL" &&
            chat?.chatMembers.some(
              (member) =>
                member.userId === user?.id &&
                (member.role === "OWNER" || member.role === "ADMIN"),
            )) ||
          chat?.ownerId === user?.id ? (
            <MessageField />
          ) : chat?.type === "GROUP" && chat?.chatMembers.some((member) => member.userId === user?.id) ? (
            <MessageField />
          ) : chat?.type === "CHANNEL" &&
            chat?.chatMembers.some(
              (member) =>
                member.userId === user?.id && member.role === "MEMBER",
            ) ? (
            <MessageSubscription />
          ) : (
            <ButtonChatJoin id={id} />
          )}
        </>
      ) : (
        <>
          <div>
            <MessageTitleDirect chat={chat} />

            <MessageList messages={messages} />
          </div>

          <MessageField />
        </>
      )}
    </>
  );
}
