import { ContactElement } from "@/entities/contact";
import { useProfileStore } from "@/features/profile";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact/contact.interface";
import { IUser } from "@/shared/types/user/user.interface";

interface IContactListProps {
  contacts: IContact[];
  user: IUser | undefined;
}

export const ContactList = ({ contacts, user }: IContactListProps) => {
  const { setType } = useTypeChatStore();
  const { openProfile } = useProfileStore();

  const handleContactClick = (targetUser: IUser) => {
    openProfile(targetUser, false);
  };

  return (
    <ul
      className={cn(
        "flex flex-col px-2.5 gap-y-2.5 overflow-y-auto h-[calc(100dvh-120px)] custom-scroll",
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
