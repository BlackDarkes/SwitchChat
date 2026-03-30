"use client";

import { useContact } from "@/entities/contact";
import { useLoginStore } from "@/features/auth/model/login-store";
import { ContactList } from "@/widgets/contact-list";
import { MessageTitleContacts } from "@/widgets/message-title";
import { useSearchUserStore } from "@/features/search";
import { ContactSearchList } from "@/widgets/contact-search-list";
import { useEffect, useRef } from "react";
import { useMobileMessages } from "@/features/mobile-messages";
import { Container } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export default function Page() {
  const { data: contacts } = useContact();
  const { user } = useLoginStore();
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const { isOpen } = useSearchUserStore();
  const searchRef = useRef(true);

  useEffect(() => {
    if (searchRef.current) {
      handleMobileMessagesOpen(true);
    }

    return () => {
      searchRef.current = false;
    };
  });

  return (
    <div>
      <MessageTitleContacts />

      <Container mod="default" className={cn("pt-5 w-full")}>
        {isOpen ? (
          <ContactSearchList user={user} />
        ) : (
          <ContactList contacts={contacts || []} user={user} />
        )}
      </Container>
    </div>
  );
}
