import { ChatFavoriteElement } from "@/entities/chat";
import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types";
import { IUser } from "@/shared/types/user/user.interface";

interface IChatFavoritesProps {
  user: IUser | undefined;
  chats: IChat[] | undefined;
}

export const ChatFavorites = ({ chats, user }: IChatFavoritesProps) => {
  if (!chats?.length) return null;

  return (
    <div
      className={cn(
        "py-5 px-10",
        "w-20 bg-accent-bg h-[calc(100dvh-clamp(83px,4vw,86px))] overflow-y-auto snap-x snap-mandatory",
        "max-md:w-screen max-md:py-2.5 max-md:h-fit max-md:px-0.5 md:overflow-x-hidden",
        "custom-scroll",
        {
          hidden: !chats?.length,
        },
      )}
    >
      <ul className={cn("flex flex-col gap-2.5", "max-md:flex-row")}>
        {chats.map((chat) => (
          <ChatFavoriteElement key={chat.id} chat={chat} user={user} />
        ))}
      </ul>
    </div>
  );
};
