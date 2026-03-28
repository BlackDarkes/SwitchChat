import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { MessageCircle, Trash2 } from "lucide-react";
import Link from "next/link";

interface IContactElementProps {
  contact: IContact;
  user: IUser | null;
  setType: (type: "CHATS" | "GROUPS") => void;
}

export const ContactElement = ({
  contact,
  user,
  setType,
}: IContactElementProps) => {
  const userContact =
    contact.ownerId === user?.id ? contact.contact : contact.owner;

  return (
    <li className={cn("flex justify-between items-center gap-x-2.5")}>
      <div className={cn("flex items-center gap-x-2.5")}>
        <UserAvatar
          userAvatar={userContact.avatar}
          userName={userContact.name}
        />

        <h3 className="text-[18px]">{userContact.name}</h3>
      </div>

      <div className={cn("flex items-center gap-x-5")}>
        <Link
          href={`/chat/${contact.owner.chatMembers?.[0]?.chatId}`}
          onClick={() => setType("CHATS")}
        >
          <MessageCircle />
        </Link>

        <button type="button">
          <Trash2 />
        </button>
      </div>
    </li>
  );
};
