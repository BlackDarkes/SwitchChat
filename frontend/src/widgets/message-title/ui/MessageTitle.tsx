"use client";

import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { MessageTitleTemplate } from "@/entities/message";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import { ChatInfoModal, useChatInfoStore } from "@/features/chat-info-modal";
import { IChat } from "@/shared/types/chat.interface";
import { EllipsisVertical } from "lucide-react";
import { useHandleBack } from "../model/handle-back";

interface IMessageTitleProps {
  chat: IChat | undefined;
}

export const MessageTitle = ({ chat }: IMessageTitleProps) => {
  const { handleBack } = useHandleBack();
  const { handleOpen: handleOpenModal, isOpen } = useChatInfoStore();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();


  return (
    <MessageTitleTemplate handleBack={handleBack}>
      <div onClick={handleOpenModal} className="flex gap-x-2.5 cursor-pointer">
        <ChatAvatar
          chatAvatar={chat?.avatar}
          chatName={chat?.name}
          size="middle"
        />

        <div className="">
          <h3>{chat?.name}</h3>
          <p>{chat?.chatMembers.length} пользователей</p>
        </div>

      </div>

      <button className="ml-auto" type="button" onClick={handleOpenChatAction}>
        <EllipsisVertical width={35} height={35} />
      </button>

      <ChatInfoModal chat={chat} isOpen={isOpen} handleOpen={handleOpenModal} />
      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </MessageTitleTemplate>
  );
};
