"use client";

import { useContact } from "@/entities/contact";
import { useLoginStore } from "@/features/auth/model/login-store";
import { ContactList } from "@/widgets/contact-list";

export default function Page() {
  const { data: contacts } = useContact();
  const { user } = useLoginStore();
  
  return (
    <div className="flex items-center justify-center h-full text-inactive-color text-[clamp(18px,1.4vw,22px)]">
      <ContactList contacts={contacts || []} user={user} />
    </div>
  );
}