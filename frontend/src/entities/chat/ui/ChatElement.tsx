"use client";

import { IChat } from "@/shared/types/chat.interface";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";

interface IChatElementProps {
  chat: IChat;
  handleOpen: () => void;
}

export const ChatElement = ({ chat, handleOpen }: IChatElementProps) => {

  return (
    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <div className="flex gap-x-3.75">
        <ChatAvatar chatAvatar={chat.avatar} chatName={chat.name} size="big" />

        <div className="flex flex-col justify-between h-full">
          <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
            {chat.name}
          </h3>
          <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
            {chat.messages?.at(-1)?.text}
          </p>
        </div>
      </div>
    </ChatElementLayout>
  );
};
