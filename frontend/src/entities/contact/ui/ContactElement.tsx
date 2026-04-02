import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { ButtonContactRemove } from "@/features/contact-remove";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface IContactElementProps {
  contact: IContact;
  user: IUser | undefined;
  setType: (type: "CHATS" | "GROUPS") => void;

  handleOpen: () => void;
}

export const ContactElement = ({
  contact,
  user,
  setType,
  handleOpen,
}: IContactElementProps) => {
  return (
    <li className={cn("flex justify-between items-center gap-x-2.5")}>
      <div className={cn("flex items-center gap-x-2.5")}>
        <UserAvatar
          userAvatar={user?.avatar}
          userName={user?.name}
          handleOpen={handleOpen}
        />

        <h3 className="text-[18px]">{user?.name}</h3>
      </div>

      <div className={cn("flex items-center gap-x-5")}>
        <Link
          href={`/chat/${contact.contact.chatMembers?.at(-1)?.chatId}`}
          onClick={() => setType("CHATS")}
        >
          <MessageCircle />
        </Link>

        <ButtonContactRemove id={contact.contact.id} />
      </div>
    </li>
  );
};
