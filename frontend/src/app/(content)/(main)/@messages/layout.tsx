"use client";

import { useMobileMessages } from "@/features/mobile-messages";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("chat")) {
      handleMobileMessagesOpen(true);
    }
  }, [pathName]);

  return <>{children}</>;
}
