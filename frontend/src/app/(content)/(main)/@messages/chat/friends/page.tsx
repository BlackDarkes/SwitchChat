"use client"

import { useContact } from "@/entities/contact";
import { useLoginStore } from "@/features/auth";
import { ContactList } from "@/widgets/contact-list";
import { MessageTitleContacts } from "@/widgets/message-titles";
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
  }, [handleMobileMessagesOpen]);

  return (
    <div className="flex flex-col h-screen">
      <MessageTitleContacts />

      <Container
        mod="default"
        className="relative w-full flex-1 overflow-hidden mt-2.5"
      >
        <div
          className={cn(
            "absolute inset-0 pt-px w-full overflow-y-auto transition-all duration-300 ease-out",
            isOpen
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto",
          )}
        >
          <ContactList contacts={contacts || []} user={user} />
        </div>

        <div
          className={cn(
            "absolute inset-0 pt-px w-full overflow-y-auto transition-all duration-300 ease-out",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          <ContactSearchList user={user} />
        </div>
      </Container>
    </div>
  );
}
