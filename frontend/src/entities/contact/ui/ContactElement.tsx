import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { IUser } from "@/shared/types/user.interface";
import { PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";

interface IContactElementProps {
  user: IUser;
}

export const ContactElement = ({ user }: IContactElementProps) => {
  return (
    <li>
      <UserAvatar userAvatar={user.avatar} userName={user.name} />

      <span className="text-[12px]">{user.name}</span>

      <Link href={`/chat/${user.id}`}>
        <PencilLine />
      </Link>

      <button type="button">
        <Trash2 />
      </button>
    </li>
  );
};
