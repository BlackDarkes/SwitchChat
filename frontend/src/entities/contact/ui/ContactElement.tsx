import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";

interface IContactElementProps {
  contact: IContact;
  user: IUser | null;
}


export const ContactElement = ({ contact, user }: IContactElementProps) => {
  const userContact = contact.ownerId === user?.id ? contact.owner : contact.contact;

  return (
    <li>
      <UserAvatar userAvatar={userContact.avatar} userName={userContact.name} />

      <span className="text-[12px]">{userContact.name}</span>

      <Link href={`/chat/${contact.owner.chatMembers?.[0]?.chatId}`}>
        <PencilLine />
      </Link>

      <button type="button">
        <Trash2 />
      </button>
    </li>
  );
};
