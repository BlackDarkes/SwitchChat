import { IChat } from "@/shared/types";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";
import { useLoginStore } from "@/features/auth";
import { memo } from "react";
import { TruncateName } from "@/shared/ui";
import { ChatAvatar } from "./ChatAvatar";

interface IChatElementDirectProps {
  chat: IChat;
  handleOpen: (open: boolean) => void;
}

export const ChatElementDirect = memo(({ chat, handleOpen }: IChatElementDirectProps) => {
  const { user: currentUser } = useLoginStore();
  const user = chat.chatMembers?.find(m => m.userId !== currentUser?.id)?.user;

  return (
    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <ChatAvatar chatAvatar={user?.avatar} chatName={user?.name} size="big" />
      <div className="flex flex-col min-w-0 flex-1 justify-center">
        <h3 className="text-base font-semibold text-primary-color truncate">
          <TruncateName>{user?.name || "Пользователь"}</TruncateName>
        </h3>
        <p className="text-sm text-secondary-color truncate mt-0.5">
          <TruncateName>{chat.messages?.at(-1)?.text || "Нет сообщений"}</TruncateName>
        </p>
      </div>
    </ChatElementLayout>
  );
});

ChatElementDirect.displayName = "ChatElementDirect";