"use client";

import { IChat } from "@/shared/types";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";
import { memo } from "react";
import { TruncateName } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface IChatElementProps {
  chat: IChat;
  handleOpen: (open: boolean) => void;
}

export const ChatElement = memo(({ chat, handleOpen }: IChatElementProps) => {
  return (
    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <div className="flex gap-x-3.75">
        <ChatAvatar chatAvatar={chat.avatar} chatName={chat.name} size="big" />

        <div className="flex flex-col justify-between h-full">
          <h3 className="text-[clamp(16px,1.5vw,20px)] font-semibold">
            <TruncateName className={cn(
              "max-w-35"
            )}>
              {chat.name}
            </TruncateName>
          </h3>
          <p className="block text-[clamp(14px,1.5vw,15px)] max-w-100 text-secondary-color">
            <TruncateName className={cn(
              "w-[clamp(10px,22vw,400px)]"
            )}>
              {chat.messages?.at(-1)?.text}
            </TruncateName>
          </p>
        </div>
      </div>
    </ChatElementLayout>
  );
});

ChatElement.displayName = "ChatElement";