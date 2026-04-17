"use client";

import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";
import { EllipsisVertical } from "lucide-react";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import { useLoginStore } from "@/features/auth/model/login-store";
import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { useProfileStore } from "@/features/profile";
import { IChat } from "@/shared/types";

interface IMessageTitleDirectProps {
  chat: IChat | undefined;
}

export const MessageTitleDirect = ({ chat }: IMessageTitleDirectProps) => {
  const { handleBack } = useHandleBack();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();
  const { user } = useLoginStore();
  const { openProfile } = useProfileStore();

  const currentChatMember = chat?.chatMembers?.find(
    (m) => m.userId !== user?.id,
  );
  const memberUser = currentChatMember?.user;

  const handleOpenProfile = () => {
    if (memberUser) openProfile(memberUser, false);
  };

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex w-full items-center gap-3 px-1">
        <button
          type="button"
          onClick={handleOpenProfile}
          className="flex min-w-0 flex-1 items-center gap-3 -m-2 p-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-secondary-bg/20 active:scale-[0.98] focus:outline-none"
        >
          <UserAvatar
            userAvatar={memberUser?.avatar}
            userName={memberUser?.name}
            size="middle"
          />
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-sm font-semibold text-primary-color truncate md:text-base">
              {memberUser?.name || "Пользователь"}
            </span>
            <span className="text-xs text-secondary-color truncate md:text-sm">
              {/* Здесь будет статус: online, last seen, typing и т.д. */}в сети
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={handleOpenChatAction}
          aria-label="Меню чата"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:bg-secondary-bg/20 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-color)/50"
        >
          <EllipsisVertical className="h-5 w-5 text-secondary-color" />
        </button>

        <ChatActionMenu
          isOpen={isOpenChatAction}
          handleOpen={handleOpenChatAction}
        />
      </div>
    </MessageTitleLayout>
  );
};
