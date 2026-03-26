import { IChat } from "@/shared/types/chat.interface";
import { useHandleElement } from "../../model/handle-element";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IChatElementLayoutProps {
  chat: IChat;
  handleOpen: () => void;
  children: ReactNode;
}
  
export const ChatElementLayout = ({ chat, handleOpen, children }: IChatElementLayoutProps) => {
  const { displayCount, param, unreadCount } = useHandleElement({ chat });

  return (
    <li>
      <Link
        href={`/chat/${chat.id}`}
        onClick={handleOpen}
        className={cn(
          `flex justify-between w-full bg-chat-bg p-[10px_15px] rounded-xl shadow-box`,
          {
            "shadow-none": param.id === chat.id,
          },
        )}
      >
        {children}

        <div className="flex flex-col items-center justify-between">
          <span className="text-[clamp(12px,1.5vw,14px)]">
            {chat.messages.at(-1)?.createdAt.split("T")[0]}
          </span>

          {unreadCount > 0 && (
            <span
              className={cn(
                "flex items-center justify-center self-end min-w-[clamp(20px,1.5vw,25px)] h-[clamp(20px,1.5vw,25px)] px-1.5 bg-red-500 text-white text-[clamp(11px,1.1vw,13px)] font-bold rounded-full",
                unreadCount > 9 && "px-1", 
              )}
            >
              {displayCount}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}