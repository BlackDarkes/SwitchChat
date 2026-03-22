import { IChat } from "@/shared/types/chat.interface";
import { ChatAvatar } from "./ChatAvatar";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface IChatFavoriteElementProps {
  chat: IChat;
}

export const ChatFavoriteElement = ({ chat }: IChatFavoriteElementProps) => {
  return (
    <li>
      <Link
        href={`/chat/${chat.id}`}
        className={cn(`flex flex-col items-center gap-y-1.25`)}
      >
        <ChatAvatar
          chatAvatar={chat?.avatar}
          chatName={chat?.name}
          size="middle"
        />
        <span className={cn(`text-[12px]`)}>{chat?.name}</span>
      </Link>
    </li>
  );
};
