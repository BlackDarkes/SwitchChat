import { cn } from "@/shared/lib/utils";
import { ChatAvatar } from "./ChatAvatar";
import Link from "next/link";
import { UserAvatar } from "@/entities/user";
import { IUser } from "@/shared/types/user/user.interface";
import { IChat } from "@/shared/types";
import { memo } from "react";
import { TruncateName } from "@/shared/ui";

interface IChatFavoriteElementProps {
  user: IUser | undefined;
  chat: IChat;
}

export const ChatFavoriteElement = memo(({ chat, user: currentUser }: IChatFavoriteElementProps) => {
  const user = chat.chatMembers?.find(m => m.userId !== currentUser?.id)?.user;
  const name = chat.type === "DIRECT" ? user?.name : chat?.name;

  return (
    <li className="flex flex-col items-center group snap-start">
      <Link
        href={`/chat/${chat.id}`}
        className={cn(
          "flex flex-col items-center gap-1.5 p-1 rounded-xl",
          "transition-all duration-200 ease-out",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
        )}
      >
        <div className="relative">
          {chat.type === "DIRECT" ? (
            <UserAvatar userAvatar={user?.avatar} userName={user?.name} size="big" />
          ) : (
            <ChatAvatar chatAvatar={chat?.avatar} chatName={chat?.name} size="middle" />
          )}
        </div>

        <TruncateName className={cn(
          "whitespace-nowrap text-center transition-colors duration-200",
          "max-w-12 text-[10px] md:max-w-16 md:text-xs",
          "text-secondary-color group-hover:text-primary-color"
        )}>
          {name}
        </TruncateName>
      </Link>
    </li>
  );
});

ChatFavoriteElement.displayName = "ChatFavoriteElement";