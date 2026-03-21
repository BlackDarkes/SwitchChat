"use client";

import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import {
  MessageInfoModal,
  useMessageInfoStore,
} from "@/features/message-info-modal";
import { useMobileMessages } from "@/features/mobile-messages";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface IMessageTitleProps {
  chat: IChat | undefined;
}

export const MessageTitle = ({ chat }: IMessageTitleProps) => {
  const { handleOpen } = useMobileMessages();
  const { handleOpen: handleOpenModal, isOpen } = useMessageInfoStore();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();
  const router = useRouter();

  const handleBack = () => {
    handleOpen();
    router.push("/");
  };

  return (
    <header className="py-4.25 bg-primary-bg border-b-2 border-border-color">
      <Container className="flex justify-between" mod="default">
        <div className="flex items-center gap-x-10">
          <button type="button" onClick={() => handleBack()}>
            <ArrowLeft width={35} height={35} />
          </button>

          <div
            onClick={handleOpenModal}
            className="flex gap-x-2.5 cursor-pointer"
          >
            <ChatAvatar
              chatAvatar={chat?.avatar}
              chatName={chat?.name}
              size="middle"
            />

            {chat?.type !== "SELF" ? (
              <div className="">
                <h3>{chat?.name}</h3>
                <p>{chat?.chatMembers.length} пользователей</p>
              </div>
            ) : (
              <div className="">
                <h3>{chat?.name}</h3>
              </div>
            )}
          </div>
        </div>

        <button type="button" onClick={handleOpenChatAction}>
          <EllipsisVertical width={35} height={35} />
        </button>

        <MessageInfoModal
          chat={chat}
          isOpen={isOpen}
          handleOpen={handleOpenModal}
        />
      </Container>

      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </header>
  );
};
