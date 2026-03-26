import { MessageTitleLayout } from "@/entities/message";
import { IChat } from "@/shared/types/chat.interface";
import { useHandleBack } from "../model/handle-back";
import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { EllipsisVertical } from "lucide-react";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import { useLoginStore } from "@/features/auth/model/login-store";

interface IMessageTitleDirectProps {
  chat: IChat | undefined;
}

export const MessageTitleDirect = ({ chat }: IMessageTitleDirectProps) => {
  const { handleBack } = useHandleBack();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();
  const { user } = useLoginStore();
  const currentChatMember = chat?.chatMembers[0].user.id === user?.id ? chat?.chatMembers[1] : chat?.chatMembers[0];

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div onClick={() => {}} className="flex items-center gap-x-2.5 cursor-pointer">
        <ChatAvatar
          chatAvatar={currentChatMember?.user.avatar}
          chatName={currentChatMember?.user.name}
          size="middle"
        />

        <div className="">
          <h3>{currentChatMember?.user.name}</h3>
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
