import { ContactElement } from "@/entities/contact";
import { useProfileStore } from "@/features/profile";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact.interface";
import { IUser } from "@/shared/types/user.interface";
import { useEffect } from "react";

interface IContactListProps {
  contacts: IContact[];
  user: IUser | undefined;
}

export const ContactList = ({ contacts, user }: IContactListProps) => {
  const { setType } = useTypeChatStore();
  const { setUser, handleOpen: handleOpenProfile } = useProfileStore();

  useEffect(() => setUser(user), [user, setUser]);

  const handleContactClick = (targetUser: IUser) => {
    setUser(targetUser);
    handleOpenProfile();
  };

  return (
    <ul
      className={cn(
        "flex flex-col gap-y-2.5 overflow-y-auto h-[calc(100dvh-120px)]",
      )}
    >
      {contacts.length ? (
        contacts.map((contact) => {
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
        })
      ) : (
        <li className={cn("text-center")}>Контакты не найдены</li>
      )}
    </ul>
  );
};
