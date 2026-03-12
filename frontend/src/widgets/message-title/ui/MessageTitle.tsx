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
    <header>
      <Container>
        <div>
          <Link href={"/"}>
            <ArrowLeft />
          </Link>

          <div>
            {chat?.avatar ? (
              <Image src={chat.avatar} alt="avatar" width={60} height={60} />
            ) : (
              <div className="flex justify-center items-center w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)] bg-primary-color text-primary-bg uppercase font-bold rounded-full">
                {chat?.name[0]}
              </div>
            )}

            <div>
              <h3>{chat?.name}</h3>
              <p>{chat?.chatMembers.length} пользователей</p>
            </div>
          </div>
        </div>

        <button type="button">
          <EllipsisVertical />
        </button>
      </Container>
    </header>
  );
};
