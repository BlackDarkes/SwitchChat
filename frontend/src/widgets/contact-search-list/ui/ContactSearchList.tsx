import { ContactElement, ContactSearchElement } from "@/entities/contact";
import { useSearchUser } from "@/entities/user";
import { useProfileStore } from "@/features/profile";
import { SearchInput, useSearchUserStore } from "@/features/search";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { IUser } from "@/shared/types/user/user.interface";
import { Container } from "@/shared/ui";
import { ChangeEvent, useState } from "react";

interface IContactSearchListProps {
  user: IUser | undefined;
}

export const ContactSearchList = ({ user }: IContactSearchListProps) => {
  const { setType } = useTypeChatStore();
  const { openProfile } = useProfileStore();
  const { handleOpen } = useSearchUserStore();
  const [search, setSearch] = useState<string>("");
  const { data: contacts } = useSearchUser(search);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleContactClick = (targetUser: IUser) => {
    openProfile(targetUser, false);
  };

  return (
    <Container mod="default">
      <SearchInput
        handleOpen={handleOpen}
        value={search}
        handleInput={handleInput}
        id="search"
      />

      <ul
        className={cn(
          "flex flex-col pt-2.5 px-2.5 gap-y-2.5 overflow-y-auto h-[calc(100dvh-160px)] custom-scroll",
        )}
      >
        {contacts?.map((contact, index) => {
          const itemKey = contact.id ?? `search-item-${index}`;

          if (contact.addedAt) {
            const userContact: IUser =
              contact.ownerId === user?.id ? contact.contact : contact.owner;

            return (
              <ContactElement
                key={itemKey}
                contact={contact}
                user={userContact}
                setType={setType}
                handleOpen={() => handleContactClick(userContact)}
              />
            );
          } else {
            return <ContactSearchElement key={itemKey} contact={contact} />;
          }
        })}
      </ul>
    </Container>
  );
};
