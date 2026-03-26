import { MessageTitleLayout } from "@/entities/message";
import { IChat } from "@/shared/types/chat.interface";
import { useHandleBack } from "../model/handle-back";
import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { EllipsisVertical } from "lucide-react";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";

interface IMessageTitleDirectProps {
  chat: IChat | undefined;
}

export const MessageTitleDirect = ({ chat }: IMessageTitleDirectProps) => {
  const { handleBack } = useHandleBack();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div onClick={() => {}} className="flex items-center gap-x-2.5 cursor-pointer">
        <ChatAvatar
          chatAvatar={chat?.chatMembers[1].user.avatar}
          chatName={chat?.chatMembers[1].user.name}
          size="middle"
        />

        <div className="">
          <h3>{chat?.chatMembers[1].user.name}</h3>
        </div>
      </div>

      <button className="ml-auto" type="button" onClick={handleOpenChatAction}>
        <EllipsisVertical width={35} height={35} />
      </button>

      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </MessageTitleLayout>
  );
};
