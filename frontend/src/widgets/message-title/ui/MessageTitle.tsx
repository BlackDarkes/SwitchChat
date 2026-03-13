import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import Link from "next/link";

interface IMessageTitleProps {
  chat: IChat | undefined;
}

export const MessageTitle = ({ chat }: IMessageTitleProps) => {
  return (
    <header className="py-4.25 bg-primary-bg border-b-2 border-border-color">
      <Container className="flex justify-between" mod="default">
        <div className="flex items-center gap-x-10">
          <Link href={"/"}>
            <ArrowLeft width={35} height={35} />
          </Link>

          <div className="flex gap-x-2.5 cursor-pointer">
            <ChatAvatar chatAvatar={chat?.avatar} chatName={chat?.name} size="middle" />

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
