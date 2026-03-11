import { IChat } from "@/shared/types/chat.interface";
import Image from "next/image";
import Link from "next/link";

interface IChatElementProps {
  chat: IChat;
}

export const ChatElement = ({ chat }: IChatElementProps) => {
  const lastReadMessageId = chat.chatMembers.at(-1)?.lastReadMessageId;
  const lastMessageId = chat.messages.at(-1)?.id;

  const countMessage = lastMessageId !== lastReadMessageId ? 1 : 0;

  return (
    <li>
      <Link href={"#"} className="flex justify-between w-full">
        <div className="flex gap-x-10">
          {chat.avatar ? (
            <Image src={chat.avatar} alt="avatar" width={50} height={50} />
          ) : (
            <div className="flex justify-center items-center w-15 h-15 bg-primary-color text-primary-bg uppercase font-bold rounded-full">
              {chat.name[0]}
            </div>
          )}

          <div>
            <h3>{chat.name}</h3>
            <p>{chat.messages.at(-1)?.text}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span>{chat.messages.at(-1)?.createdAt.split("T")[0]}</span>
          <p className="w-7.5 h-7.5">{countMessage}</p>
        </div>
      </Link>
    </li>
  );
};
