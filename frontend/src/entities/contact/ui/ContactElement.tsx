import { UserAvatar } from "@/entities/user";
import { ButtonContactRemove } from "@/features/contact-remove";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact/contact.interface";
import { IUser } from "@/shared/types/user/user.interface";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface IContactElementProps {
  contact: IContact;
  user: IUser | undefined;
  setType: (type: "CHATS" | "GROUPS") => void;
  handleOpen: () => void;
}

export const ContactElement = memo(({ contact, user, setType, handleOpen }: IContactElementProps) => {
  const chatId = contact.contact.chatMembers?.at(-1)?.chatId;

  return (
    <li
      className={cn(
        "flex w-full items-center justify-between gap-3 p-3 rounded-xl",
        "transition-all duration-200 cursor-pointer select-none",
        "hover:bg-secondary-bg/20 active:scale-[0.99]",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent-color/50"
      )}
      onClick={handleOpen}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
    >
      <div className="flex min-w-0 items-center gap-3 flex-1">
        <div className="shrink-0 pointer-events-none">
          <UserAvatar
            userAvatar={user?.avatar}
            userName={user?.name}
          />
        </div>
        <h3 className="text-lg font-medium text-primary-color truncate">
          {user?.name}
        </h3>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {chatId && (
          <Link
            href={`/chat/${chatId}`}
            onClick={(e) => {
              e.stopPropagation(); 
              setType("CHATS");
            }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              "text-secondary-color hover:text-accent-color hover:bg-secondary-bg/30",
              "active:scale-95 transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
            )}
            aria-label="Написать сообщение"
          >
            <MessageCircle size={20} />
          </Link>
        )}

        <div onClick={(e) => e.stopPropagation()}>
          <ButtonContactRemove id={contact.contact.id} />
        </div>
      </div>
    </li>
  );
});

ContactElement.displayName = "ContactElement";