import { IChat } from "@/shared/types/chat.interface";
import { Container } from "@/shared/ui";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IMessageTitleProps {
  chat: IChat | undefined;
}

export const MessageTitle = ({ chat }: IMessageTitleProps) => {
  return (
    <header className="p-4.25 bg-primary-bg border-b-2 border-border-color">
      <Container className="flex justify-between">
        <div className="flex items-center gap-x-10">
          <Link href={"/"}>
            <ArrowLeft width={35} height={35} />
          </Link>

          <div className="flex gap-x-2.5 cursor-pointer">
            {chat?.avatar ? (
              <Image src={chat.avatar} alt="avatar" width={60} height={60} />
            ) : (
              <div className="flex justify-center items-center w-[clamp(40px,4vw,50px)] h-[clamp(40px,4vw,50px)] bg-primary-color text-primary-bg uppercase font-bold rounded-full">
                {chat?.name[0]}
              </div>
            )}

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
