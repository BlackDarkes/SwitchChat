import { UserAvatar } from "@/entities/user";
import { ButtonContactAdd } from "@/features/contact-add";
import { cn } from "@/shared/lib/utils";
import { IContact } from "@/shared/types/contact/contact.interface";
import { memo } from "react";

interface IContactSearchElementProps {
  contact: IContact;
}

export const ContactSearchElement = memo(({ contact }: IContactSearchElementProps) => {
  const user = contact?.contact;

  return (
    <li
      className={cn(
        "flex w-full items-center justify-between gap-3 p-3 rounded-xl",
        "transition-all duration-200 select-none",
        "hover:bg-secondary-bg/20 active:scale-[0.99]",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent-color/50"
      )}
    >
      <div className="flex min-w-0 items-center gap-3 flex-1">
        <div className="shrink-0 pointer-events-none">
          <UserAvatar
            userAvatar={user?.avatar}
            userName={user?.name}
          />
        </div>
        <h3 className="text-lg font-medium text-primary-color truncate">
          {user?.name}
        </h3>
      </div>
        
      <ButtonContactAdd id={user?.id} />
    </li>
  );
});

ContactSearchElement.displayName = "ContactSearchElement";