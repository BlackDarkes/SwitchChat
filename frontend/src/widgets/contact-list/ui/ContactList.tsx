import { ContactElement } from "@/entities/contact";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";

interface IContactListProps {
  contacts: IContact[];
  user: IUser | null;
}

export const ContactList = ({ contacts, user }: IContactListProps) => {
  const { setType } = useTypeChatStore();

  return (
    <ul>
      {contacts.map((contact) => (
        <ContactElement
          key={contact.id}
          contact={contact}
          user={user}
          setType={setType}
        />
      ))}
    </ul>
  );
};
