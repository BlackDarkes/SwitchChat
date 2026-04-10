import { UserAvatar } from "@/entities/user";
import { ButtonContactAdd } from "@/features/contact-add";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact/contact.interface";
import { memo } from "react";

interface IContactSearchElementProps {
  contact: IContact;
}

export const ContactSearchElement = memo(({
  contact,
}: IContactSearchElementProps) => {
  return (
    <li className={cn("flex justify-between items-center gap-x-2.5")}>
      <div className={cn("flex items-center gap-x-2.5")}>
        <UserAvatar
          userAvatar={contact?.contact?.avatar}
          userName={contact?.contact?.name}
        />

        <h3 className="text-[18px]">{contact?.contact?.name}</h3>
      </div>

      <ButtonContactAdd id={contact?.contact?.id} />
    </li>
  );
});

ContactSearchElement.displayName = "ContactSearchElement";