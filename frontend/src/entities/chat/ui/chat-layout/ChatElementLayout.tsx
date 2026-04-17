import { useHandleElement } from "../../model/handle-element";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";
import { ContextMenu } from "radix-ui";
import { ButtonAddFavorite } from "@/features/chat-add-favorite";
import { ButtonRemoveFavorite } from "@/features/chat-remote-favorite";
import { IChat } from "@/shared/types";

const formatChatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  if (isToday)
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (isYesterday) return "Вчера";
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
};

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
  const isActive = param.id === chat.id;
  const lastDate = formatChatDate(chat.messages?.at(-1)?.createdAt);

  return (
    <li
      className={cn(
        "w-full rounded-xl transition-all duration-200",
        isActive
          ? "bg-accent-bg/40 shadow-none"
          : "hover:bg-secondary-bg/20 shadow-box",
      )}
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Link
            href={`/chat/${chat.id}`}
            onClick={() => handleOpen(true)}
            className={cn(
              "flex w-full items-center gap-3 p-3 rounded-xl cursor-pointer",
              isActive && "border-l-[3px] border-accent-color pl-3.25",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="flex min-w-0 flex-1 gap-3 items-center">
              {children}
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {lastDate && (
                <span
                  className={cn(
                    "text-xs font-medium tabular-nums",
                    isActive ? "text-accent-color" : "text-secondary-color",
                  )}
                >
                  {lastDate}
                </span>
              )}

              {unreadCount > 0 && (
                <span
                  className={cn(
                    "flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full",
                    "bg-accent-color text-white shadow-sm",
                    displayCount.toString().length > 1 && "px-1 min-w-6",
                  )}
                >
                  {displayCount}
                </span>
              )}
            </div>
          </Link>
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content className="p-2 min-w-48 bg-card border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2">
            <ContextMenu.Item className="rounded-lg px-2 py-1.5 text-sm cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none">
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
