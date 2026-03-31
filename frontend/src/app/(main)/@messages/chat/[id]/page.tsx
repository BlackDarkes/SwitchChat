"use client";

import { useChatById } from "@/entities/chat";
import { useChatMessages } from "@/entities/message/api/useChatMessages";
import { useLoginStore } from "@/features/auth/model/login-store";
import { ButtonChatJoin } from "@/features/chat-join";
import { MessageField } from "@/widgets/message-field/ui/MessageField";
import { MessageList } from "@/widgets/message-list";
import { MessageTitle, MessageTitleDirect } from "@/widgets/message-title";
import { redirect, useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { messages } = useChatMessages(id);
  const { user } = useLoginStore();
  const { data: chat } = useChatById(id);

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
          ) : chat?.type === "CHANNEL" &&
            chat?.chatMembers.some(
              (member) =>
                member.userId === user?.id && member.role === "MEMBER",
            ) ? (
            <p>Вы подписаны на канал</p>
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
