"use client";

import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types/chat.interface";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChatAvatar } from "./ChatAvatar";

interface IChatElementProps {
  chat: IChat;
  handleOpen: () => void;
}

export const ChatElement = ({ chat, handleOpen }: IChatElementProps) => {
  const param = useParams<{ id: string }>();

  const lastReadMessageId = chat.chatMembers.at(-1)?.lastReadMessageId;
  const lastMessageId = chat.messages.at(-1)?.id;

  const countMessage = lastMessageId !== lastReadMessageId ? 1 : 0;

  return (
    <li>
      <Link
        href={`/chat/${chat.id}`}
        onClick={handleOpen}
        className={cn(
          `flex justify-between w-full bg-chat-bg p-[10px_15px] rounded-xl shadow-box`,
          {
            "shadow-none": param.id === chat.id,
          },
        )}
      >
        <div className="flex gap-x-3.75">
          <ChatAvatar
            chatAvatar={chat.avatar}
            chatName={chat.name}
            size="big"
          />

          <div className="flex flex-col justify-between h-full">
            <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
              {chat.name}
            </h3>
            <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
              {chat.messages.at(-1)?.text}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <span className="text-[clamp(12px,1.5vw,14px)]">
            {chat.messages.at(-1)?.createdAt.split("T")[0]}
          </span>
          <p className="flex items-center justify-center self-end w-[clamp(20px,1.5vw,25px)] h-[clamp(20px,1.5vw,25px)] bg-secondary-bg text-not-read text-[clamp(12px,1.1vw,14px)] rounded-full">
            {countMessage}
          </p>
        </div>
      </Link>
    </li>
  );
};
