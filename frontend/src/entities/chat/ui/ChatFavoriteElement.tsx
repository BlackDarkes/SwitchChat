import { IChat } from "@/shared/types/chat.interface";
import { ChatAvatar } from "./ChatAvatar";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { UserAvatar } from "@/entities/user";
import { IUser } from "@/shared/types/user.interface";

interface IChatFavoriteElementProps {
  user: IUser | undefined;
  chat: IChat;
}

export const ChatFavoriteElement = ({ chat, user: currentUser }: IChatFavoriteElementProps) => {
  const user = chat.ownerId === currentUser?.id ? chat.chatMembers?.[1]?.user : chat.chatMembers?.[0]?.user;

  return (
    <li className={cn("px-2")}>
      <Link
        href={`/chat/${chat.id}`}
        className={cn(`flex flex-col items-center gap-y-1.25`)}
      >
        {chat.type === "DIRECT" ? (
          <>
            <UserAvatar
              userAvatar={user?.avatar}
              userName={user?.name}
              size="big"
            />
            <span className={cn(`max-w-full max-h-5 text-[12px] truncate`)}>
              {user?.name}
            </span>
          </>
        ) : (
          <>
            <ChatAvatar
              chatAvatar={chat?.avatar}
              chatName={chat?.name}
              size="middle"
            />
            <span className={cn(`max-w-full max-h-5 text-[12px] truncate`)}>
              {chat?.name}
            </span>
          </>
        )}
      </Link>
    </li>
  );
};
