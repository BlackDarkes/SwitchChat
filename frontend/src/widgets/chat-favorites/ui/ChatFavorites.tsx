import { ChatFavoriteElement } from "@/entities/chat";
import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types";
import { IUser } from "@/shared/types/user/user.interface";

interface IChatFavoritesProps {
  user: IUser | undefined;
  chats: IChat[] | undefined;
}

export const ChatFavorites = ({ chats, user }: IChatFavoritesProps) => {
  return (
    <ul className={cn(
      "flex flex-col gap-y-2.5",
      "max-md:flex-row",
    )}>
      {chats?.map((chat) => (
        <ChatFavoriteElement key={chat.id} chat={chat} user={user} />
      ))}
    </ul>
  );
};
