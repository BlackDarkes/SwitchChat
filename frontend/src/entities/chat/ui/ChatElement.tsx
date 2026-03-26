"use client";

import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types/chat.interface";
import Link from "next/link";
import { ChatAvatar } from "./ChatAvatar";
import { useHandleElement } from "../model/handle-element";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";

interface IChatElementProps {
  chat: IChat;
  handleOpen: () => void;
}

export const ChatElement = ({ chat, handleOpen }: IChatElementProps) => {
  const { displayCount, param, unreadCount } = useHandleElement({ chat });

  return (
    // <li>
    //   <Link
    //     href={`/chat/${chat.id}`}
    //     onClick={handleOpen}
    //     className={cn(
    //       `flex justify-between w-full bg-chat-bg p-[10px_15px] rounded-xl shadow-box`,
    //       {
    //         "shadow-none": param.id === chat.id,
    //       },
    //     )}
    //   >
    //     <div className="flex gap-x-3.75">
    //       <ChatAvatar
    //         chatAvatar={chat.avatar}
    //         chatName={chat.name}
    //         size="big"
    //       />

    //       <div className="flex flex-col justify-between h-full">
    //         <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
    //           {chat.name}
    //         </h3>
    //         <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
    //           {chat.messages?.at(-1)?.text}
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex flex-col items-center justify-between">
    //       <span className="text-[clamp(12px,1.5vw,14px)]">
    //         {chat.messages.at(-1)?.createdAt.split("T")[0]}
    //       </span>

    //       {unreadCount > 0 && (
    //         <span
    //           className={cn(
    //             "flex items-center justify-center self-end min-w-[clamp(20px,1.5vw,25px)] h-[clamp(20px,1.5vw,25px)] px-1.5 bg-red-500 text-white text-[clamp(11px,1.1vw,13px)] font-bold rounded-full",
    //             unreadCount > 9 && "px-1",
    //           )}
    //         >
    //           {displayCount}
    //         </span>
    //       )}
    //     </div>
    //   </Link>
    // </li>

    <ChatElementLayout chat={chat} handleOpen={handleOpen}>
      <div className="flex gap-x-3.75">
        <ChatAvatar chatAvatar={chat.avatar} chatName={chat.name} size="big" />

        <div className="flex flex-col justify-between h-full">
          <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
            {chat.name}
          </h3>
          <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
            {chat.messages?.at(-1)?.text}
          </p>
        </div>
      </div>
    </ChatElementLayout>
  );
};
