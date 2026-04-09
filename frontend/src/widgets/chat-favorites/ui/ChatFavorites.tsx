import { ChatFavoriteElement } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";
import { IUser } from "@/shared/types/user.interface";

interface IChatFavoritesProps {
  user: IUser | undefined;
  chats: IChat[] | undefined;
}
  
export const ChatFavorites = ({ chats, user }: IChatFavoritesProps) => {
  return (
    <ul className="flex flex-col gap-y-2.5 h-[calc(100dvh-120px)] overflow-y-auto max-md:h-fit max-md:flex-row">
      {chats?.map((chat) => (
        <ChatFavoriteElement key={chat.id} chat={chat} user={user} />
      ))}
    </ul>
  );
}