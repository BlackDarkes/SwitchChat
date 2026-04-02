import { ContactElement, ContactSearchElement } from "@/entities/contact";
import { useSearchUser } from "@/entities/user";
import { SearchInput, useSearchUserStore } from "@/features/search";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { IUser } from "@/shared/types/user.interface";
import { Container } from "@/shared/ui";
import { ChangeEvent, useState } from "react";

interface IContactSearchListProps {
  user: IUser | undefined;
}

export const ContactSearchList = ({ user }: IContactSearchListProps) => {
  const { setType } = useTypeChatStore();
  const { handleOpen } = useSearchUserStore();
  const [search, setSearch] = useState<string>("");
  const { data: contacts } = useSearchUser(search);

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
        {contacts?.map((contact) => {
          if (contact.addedAt) {
            return (
              <ContactElement
                key={contact.id}
                contact={contact}
                user={user}
                setType={setType}
              />
            );
          } else {
            return <ContactSearchElement key={contact.id} contact={contact} />;
          }
        })}
      </ul>
    </Container>
  );
};
