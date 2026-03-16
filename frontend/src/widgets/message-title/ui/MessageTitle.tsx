"use client";

import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
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

          <div className="flex gap-x-2.5 cursor-pointer">
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
        </div>

        <button type="button">
          <EllipsisVertical width={35} height={35} />
        </button>
      </Container>
    </header>
  );
};
