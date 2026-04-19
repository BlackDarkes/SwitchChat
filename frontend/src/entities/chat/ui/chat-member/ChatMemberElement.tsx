import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { IChatMember } from "@/shared/types";
import { TruncateName } from "@/shared/ui";
import { memo } from "react";

interface IChatMemberElementProps {
  chatMember: IChatMember;
  handleOpenProfile: () => void;
}

const ROLE_CONFIG = {
  OWNER: { label: "Создатель", className: "bg-accent-color/15 text-accent-color border-accent-color/30" },
  ADMIN: { label: "Администратор", className: "bg-[var(--secondary-bg)]/20 text-secondary-color border-secondary-color/30" },
  MEMBER: { label: "Пользователь", className: "bg-primary-color/5 text-secondary-color border-primary-color/10" },
};

export const ChatMemberElement = memo(({ chatMember, handleOpenProfile }: IChatMemberElementProps) => {
  const role = chatMember.role || "MEMBER";
  const { label, className } = ROLE_CONFIG[role] || ROLE_CONFIG.MEMBER;

  return (
    <li
      className={cn(
        "flex w-full items-center justify-between gap-3 p-2 rounded-xl",
        "transition-all duration-200 cursor-pointer select-none",
        "hover:bg-secondary-bg/20 active:scale-[0.99]",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent-color/50"
      )}
      onClick={handleOpenProfile}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleOpenProfile()}
    >
      <div className="flex min-w-0 items-center gap-3 flex-1">
        <div className="shrink-0 pointer-events-none">
          <UserAvatar
            userAvatar={chatMember.user.avatar}
            userName={chatMember.user.name}
          />
        </div>
        <TruncateName className="text-sm font-medium text-primary-color truncate">
          {chatMember.user.name}
        </TruncateName>
      </div>

      <span className={cn(
        "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border",
        className
      )}>
        {label}
      </span>
    </li>
  );
});

ChatMemberElement.displayName = "ChatMemberElement";