import { Container } from "@/shared/ui";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Container className="flex items-center h-screen">{children}</Container>
    </main>
  );
}
