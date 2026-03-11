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
      <Link href={"#"} className="flex justify-between w-full bg-chat-bg p-[10px_15px] rounded-xl">
        <div className="flex gap-x-3.75">
          {chat.avatar ? (
            <Image src={chat.avatar} alt="avatar" width={50} height={50} />
          ) : (
            <div className="flex justify-center items-center w-15 h-15 bg-primary-color text-primary-bg uppercase font-bold rounded-full">
              {chat.name[0]}
            </div>
          )}

          <div className="flex flex-col justify-between h-full">
            <h3 className="text-[22px] font-semibold">{chat.name}</h3>
            <p className="text-[18px] text-secondary-color">{chat.messages.at(-1)?.text}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between h-15">
          <span>{chat.messages.at(-1)?.createdAt.split("T")[0]}</span>
          <p className="flex items-center justify-center w-6.25 h-6.25 bg-secondary-bg text-not-read rounded-full text-[14px]">{countMessage}</p>
        </div>
      </Link>
    </li>
  );
};
