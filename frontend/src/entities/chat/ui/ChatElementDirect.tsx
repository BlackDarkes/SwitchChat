import { IChat } from "@/shared/types/chat.interface";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";
import { useLoginStore } from "@/features/auth/model/login-store";

interface IChatElementDirectProps {
  chat: IChat;
  handleOpen: () => void;
}

export const ChatElementDirect = ({ chat, handleOpen }: IChatElementDirectProps) => {
  const { user: currentUser } = useLoginStore();
  const user = chat.ownerId === currentUser?.id ? chat.chatMembers[1].user : chat.chatMembers[0].user;

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
