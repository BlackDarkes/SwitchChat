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
      <div className="flex w-full items-center gap-3 px-1">
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex min-w-0 flex-1 items-center gap-3 -m-2 p-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-secondary-bg/20 active:scale-[0.98] focus:outline-none"
        >
          <ChatAvatar
            chatAvatar={chat?.avatar}
            chatName={chat?.name}
            size="middle"
          />

          <div className="flex flex-col items-start min-w-0">
            <TruncateName className="text-sm font-semibold text-primary-color md:text-base">
              {chat?.name}
            </TruncateName>
            <span className="text-xs text-secondary-color truncate md:text-sm">
              {chat?.chatMembers?.length} участников
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={handleOpenChatAction}
          aria-label="Меню чата"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:bg-secondary-bg/20 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-color)/50"
        >
          <EllipsisVertical className="h-5 w-5 text-secondary-color transition-colors" />
        </button>
      </div>

      <ChatInfoModal chat={chat} isOpen={isOpen} handleOpen={handleOpenModal} />
      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </MessageTitleLayout>
  );
};