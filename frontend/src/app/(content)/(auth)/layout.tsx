"use client";

import { Toast, useToastStore } from "@/features/toast";
import { Container } from "@/shared/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen: toastIsOpen, message, type, handleClose } = useToastStore();

  return (
    <main>
      <Container className="flex items-center h-screen">{children}</Container>
      <Toast
        isOpen={toastIsOpen}
        message={message}
        type={type}
        handleClose={handleClose}
      />
    </main>
  );
}
