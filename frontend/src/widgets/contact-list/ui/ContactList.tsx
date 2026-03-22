import { ContactElement } from "@/entities/contact";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";

interface IContactListProps {
  contacts: IContact[];
  user: IUser | null;
}
  
export const ContactList = ({ contacts, user }: IContactListProps) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactElement key={contact.id} contact={contact} user={user} />
      ))}
    </ul>
  );
}