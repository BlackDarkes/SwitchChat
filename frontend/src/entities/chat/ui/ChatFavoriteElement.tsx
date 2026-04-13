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

export const ChatFavoriteElement = memo(({
  chat,
  user: currentUser,
}: IChatFavoriteElementProps) => {
  const user =
    chat.chatMembers?.[0]?.userId === currentUser?.id
      ? chat.chatMembers?.[1]?.user
      : chat.chatMembers?.[0]?.user;

  return (
    <li className={cn("px-2 w-15.75")}>
      <Link
        href={`/chat/${chat.id}`}
        className={cn("flex flex-col items-center gap-y-1.25")}
      >
        {chat.type === "DIRECT" ? (
          <>
            <UserAvatar
              userAvatar={user?.avatar}
              userName={user?.name}
              size="big"
            />
            <TruncateName textSize={12}>
              {user?.name}
            </TruncateName>
          </>
        ) : (
          <>
            <ChatAvatar
              chatAvatar={chat?.avatar}
              chatName={chat?.name}
              size="middle"
            />
            <TruncateName textSize={12}>
              {chat?.name}
            </TruncateName>
          </>
        )}
      </Link>
    </li>
  );
});

ChatFavoriteElement.displayName = "ChatFavoriteElement";