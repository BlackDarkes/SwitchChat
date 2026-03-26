import { IChat } from "@/shared/types/chat.interface";
import { useHandleElement } from "../model/handle-element";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";

interface IChatElementDirectProps {
  chat: IChat;
  handleOpen: () => void;
}

export const ChatElementDirect = ({ chat, handleOpen }: IChatElementDirectProps) => {
  const { displayCount, param, unreadCount } = useHandleElement({ chat });
  const user = chat.chatMembers[1].user;

  return (
    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <div className="flex gap-x-3.75">
        <ChatAvatar chatAvatar={user.avatar} chatName={user.name} size="big" />

        <div className="flex flex-col justify-between h-full">
          <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
            {user.name}
          </h3>
          <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
            {chat.messages?.at(-1)?.text}
          </p>
        </div>
      </div>
    </ChatElementLayout>
  );
};
