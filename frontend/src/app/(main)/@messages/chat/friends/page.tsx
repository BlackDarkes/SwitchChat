"use client";

import { useContact } from "@/entities/contact";
import { useLoginStore } from "@/features/auth/model/login-store";
import { ContactList } from "@/widgets/contact-list";
import { MessageTitleContacts } from "@/widgets/message-title";
import { useSearchUserStore } from "@/features/search";
import { ContactSearchList } from "@/widgets/contact-search-list";

export default function Page() {
  const { data: contacts } = useContact();
  const { user } = useLoginStore();
  const { isOpen } = useSearchUserStore();

  return (
    <div>
      <MessageTitleContacts />

      {isOpen ? (
        <ContactSearchList contacts={contacts || []} user={user} />
      ) : (
        <ContactList contacts={contacts || []} user={user} />
      )}
    </div>
  );
}
