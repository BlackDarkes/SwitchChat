"use client";

import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { MessageTitleLayout } from "@/entities/message";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import { ChatInfoModal, useChatInfoStore } from "@/features/chat-info-modal";
import { IChat } from "@/shared/types";
import { EllipsisVertical } from "lucide-react";
import { useHandleBack } from "../model/handle-back";
import { TruncateName } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface IMessageTitleProps {
  chat: IChat | undefined;
}

export const MessageTitle = ({ chat }: IMessageTitleProps) => {
  const { handleBack } = useHandleBack();
  const { handleOpen: handleOpenModal, isOpen } = useChatInfoStore();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();


  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div onClick={handleOpenModal} className="flex gap-x-2.5 cursor-pointer">
        <ChatAvatar
          chatAvatar={chat?.avatar}
          chatName={chat?.name}
          size="middle"
        />

        <div className="flex flex-col justify-between">
          <TruncateName className={cn(
            "w-25 text-[clamp(14px,1.5vw,20px)] font-bold",
            "md:w-[clamp(150px,14vw,300px)]",
          )}>
            {chat?.name}
          </TruncateName>
          <p className="text-[clamp(12px,1.5vw,14px)] text-secondary-color">{chat?.chatMembers?.length} пользователей</p>
        </div>

      </div>

      <button className="ml-auto w-[clamp(25px,4vw,30px)] h-[clamp(25px,4vw,30px)]" type="button" onClick={handleOpenChatAction}>
        <EllipsisVertical className="w-full h-full" />
      </button>

      <ChatInfoModal chat={chat} isOpen={isOpen} handleOpen={handleOpenModal} />
      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </MessageTitleLayout>
  );
};
