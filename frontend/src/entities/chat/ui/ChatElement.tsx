import { IChat } from "@/shared/types";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";
import { memo } from "react";
import { TruncateName } from "@/shared/ui";

interface IChatElementProps {
  chat: IChat;
  handleOpen: (open: boolean) => void;
}

export const ChatElement = memo(({ chat, handleOpen }: IChatElementProps) => {
  return (
    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <ChatAvatar chatAvatar={chat.avatar} chatName={chat.name} size="big" />
      <div className="flex flex-col min-w-0 flex-1 justify-center">
        <h3 className="text-base font-semibold text-primary-color truncate">
          <TruncateName>{chat.name}</TruncateName>
        </h3>
        <p className="text-sm text-secondary-color truncate mt-0.5">
          <TruncateName>{chat.messages?.at(-1)?.text || ""}</TruncateName>
        </p>
      </div>
    </ChatElementLayout>
  );
});

ChatElement.displayName = "ChatElement";