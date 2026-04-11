import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { IChatMember } from "@/shared/types";
import { memo } from "react";

interface IChatMemberElementProps {
  chatMember: IChatMember;
  handleOpenProfile: () => void;
}

export const ChatMemberElement = memo(
  ({ chatMember, handleOpenProfile }: IChatMemberElementProps) => {
    const handleRole = () => {
      switch (chatMember.role) {
        case "ADMIN":
          return "Администратор";
        case "OWNER":
          return "Создатель";
        default:
          return "Пользователь";
      }
    };

    return (
      <li className={cn("flex justify-between items-center gap-x-2.5")}>
        <div className="flex items-center gap-x-2.5">
          <UserAvatar
            userAvatar={chatMember.user.avatar}
            userName={chatMember.user.name}
            handleOpen={handleOpenProfile}
          />
          <span className={cn("max-w-25 max-h-5.5 truncate")}>{chatMember.user.name}</span>
        </div>

        <span>{handleRole()}</span>
      </li>
    );
  },
);

ChatMemberElement.displayName = "ChatMemberElement";
