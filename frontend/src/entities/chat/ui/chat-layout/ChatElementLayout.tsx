
import { useHandleElement } from "../../model/handle-element";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";
import { ContextMenu } from "radix-ui";
import { ButtonAddFavorite } from "@/features/chat-add-favorite";
import { ButtonRemoveFavorite } from "@/features/chat-remote-favorite";
import { IChat } from "@/shared/types";

interface IChatElementLayoutProps {
  chat: IChat;
  handleOpen: (open: boolean) => void;
  children: ReactNode;
}

export const ChatElementLayout = ({
  chat,
  handleOpen,
  children,
}: IChatElementLayoutProps) => {
  const { displayCount, param, unreadCount } = useHandleElement({ chat });

  return (
    <li
      className={cn("rounded-xl shadow-box transition-all duration-400 z-100", {
        "shadow-none opacity-80": param.id === chat.id,
      })}
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Link
            href={`/chat/${chat.id}`}
            onClick={() => handleOpen(true)}
            className={cn(
              "flex justify-between w-full bg-chat-bg p-[10px_15px] rounded-xl",
            )}
          >
            {children}

            <div className="flex flex-col items-center justify-between">
              <span className="text-[clamp(12px,1.5vw,14px)]">
                {chat.messages?.at(-1)?.createdAt.split("T")[0]}
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
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content
            className={cn("p-2 min-w-50 bg-accent-bg rounded-xl z-200")}
          >
            <ContextMenu.Item>
              {chat.chatMembers?.some((member) => member.isFavorite) ? (
                <ButtonRemoveFavorite chatId={chat.id} />
              ) : (
                <ButtonAddFavorite chatId={chat.id} />
              )}
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </li>
  );
};
