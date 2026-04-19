import { ContactElement, ContactSearchElement } from "@/entities/contact";
import { useSearchUser } from "@/entities/user";
import { useProfileStore } from "@/features/profile";
import { SearchInput, useSearchUserStore } from "@/features/search";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { IUser } from "@/shared/types/user/user.interface";
import { Container } from "@/shared/ui";
import { ChangeEvent, useState } from "react";
import { Loader2, SearchX } from "lucide-react";

interface IContactSearchListProps {
  user: IUser | undefined;
}

export const ContactSearchList = ({ user }: IContactSearchListProps) => {
  const { setType } = useTypeChatStore();
  const { openProfile } = useProfileStore();
  const { handleOpen } = useSearchUserStore();
  const [search, setSearch] = useState<string>("");
  const { data: contacts, isLoading } = useSearchUser(search);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleContactClick = (targetUser: IUser) => {
    openProfile(targetUser, false);
  };

  return (
    <Container mod="default" className="flex flex-col h-full gap-3">
      <div className="transition-all duration-300 ease-out">
        <SearchInput
          handleOpen={handleOpen}
          value={search}
          handleInput={handleInput}
          id="search"
        />
      </div>

      <ul className="flex flex-col gap-y-2 overflow-y-auto flex-1 custom-scroll pr-1">
        {isLoading ? (
          <li className="flex flex-col items-center justify-center py-12 text-secondary-color">
            <Loader2 className="h-5 w-5 animate-spin mb-2" />
            <span className="text-sm">Поиск...</span>
          </li>
        ) : contacts?.length === 0 ? (
          <li className="flex flex-col items-center justify-center py-12 text-secondary-color">
            <SearchX className="h-6 w-6 mb-2 opacity-50" />
            <span className="text-sm">Ничего не найдено</span>
          </li>
        ) : (
          contacts?.map((contact, index) => {
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
            }

            return <ContactSearchElement key={itemKey} contact={contact} />;
          })
        )}
      </ul>
    </Container>
  );
};