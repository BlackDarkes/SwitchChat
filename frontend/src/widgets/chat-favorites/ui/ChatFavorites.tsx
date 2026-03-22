import { ChatFavoriteElement } from "@/entities/chat";
import { IChat } from "@/shared/types/chat.interface";

interface IChatFavoritesProps {
  chats: IChat[] | undefined;
}
  
export const ChatFavorites = ({ chats }: IChatFavoritesProps) => {
  return (
    <ul className="flex flex-col gap-y-2.5">
      {chats?.map((chat) => (
        <ChatFavoriteElement key={chat.id} chat={chat} />
      ))}
    </ul>
  );
}