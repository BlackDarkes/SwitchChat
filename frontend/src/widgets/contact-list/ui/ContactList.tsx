import { ContactElement } from "@/entities/contact";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";

interface IContactListProps {
  contacts: IContact[];
  user: IUser | undefined;
}

export const ContactList = ({ contacts, user }: IContactListProps) => {
  const { setType } = useTypeChatStore();

  return (
    <ul
      className={cn(
        "flex flex-col gap-y-2.5 overflow-y-auto h-[calc(100vh-120px)]",
      )}
    >
      {contacts.length ? (
        contacts.map((contact) => (
          <ContactElement
            key={contact.id}
            contact={contact}
            user={user}
            setType={setType}
          />
        ))
      ) : (
        <li className={cn("text-center")}>Контакты не найдены</li>
      )}
    </ul>
  );
};
