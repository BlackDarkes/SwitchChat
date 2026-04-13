"use client";

import { useMobileMessages } from "@/features/mobile-messages";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();
  const pathName = usePathname();
  const openRef = useRef(true);

  useEffect(() => {
    if (openRef.current && pathName.includes("chat")) {
      handleMobileMessagesOpen(true);
    }

    return () => {
      openRef.current = false;
    };
  }, []);

  return <>{children}</>;
}
