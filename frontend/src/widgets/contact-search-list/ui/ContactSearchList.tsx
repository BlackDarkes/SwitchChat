import { ContactElement } from "@/entities/contact";
import { SearchInput, useSearchUserStore } from "@/features/search";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { Container } from "@/shared/ui";
import { ChangeEvent, useState } from "react";

interface IContactSearchListProps {
  contacts: IContact[];
  user: IUser | null;
}

export const ContactSearchList = ({
  contacts,
  user,
}: IContactSearchListProps) => {
  const { setType } = useTypeChatStore();
  const { handleOpen } = useSearchUserStore();
  const [search, setSearch] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <Container mod="default">
      <SearchInput
        handleOpen={handleOpen}
        value={search}
        handleInput={handleInput}
        id="search"
      />

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
    </Container>
  );
};
