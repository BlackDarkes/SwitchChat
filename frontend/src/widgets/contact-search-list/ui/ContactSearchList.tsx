import { ContactElement } from "@/entities/contact";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { Container } from "@/shared/ui";

interface IContactSearchListProps {
  contacts: IContact[];
  user: IUser | null;
}

export const ContactSearchList = ({
  contacts,
  user,
}: IContactSearchListProps) => {
  const { setType } = useTypeChatStore();

  return (
    <Container mod="default">
      <ul>
        {contacts.map((contact) => (
          <ContactElement key={contact.id} contact={contact} user={user} setType={setType} />
        ))}
      </ul>
    </Container>
  );
};
