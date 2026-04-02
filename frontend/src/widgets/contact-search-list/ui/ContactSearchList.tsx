import { ContactElement, ContactSearchElement } from "@/entities/contact";
import { useSearchUser } from "@/entities/user";
import { useProfileStore } from "@/features/profile";
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
  const { setUser, handleOpen: handleOpenProfile } = useProfileStore();
  const { handleOpen } = useSearchUserStore();
  const [search, setSearch] = useState<string>("");
  const { data: contacts } = useSearchUser(search);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleContactClick = (targetUser: IUser) => {
    setUser(targetUser);
    handleOpenProfile();
  };

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
            const userContact: IUser =
              contact.ownerId === user?.id ? contact.contact : contact.owner;

            return (
              <ContactElement
                key={contact.id}
                contact={contact}
                user={userContact}
                setType={setType}
                handleOpen={() => handleContactClick(userContact)}
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