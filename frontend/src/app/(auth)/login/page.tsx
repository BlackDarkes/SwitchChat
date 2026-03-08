import { LoginForm } from "@/features//login";
import { Container } from "@/shared/ui";

export default function AuthPage() {
  return (
    <main>
      <Container className="flex items-center h-screen">
        <LoginForm />
      </Container>
    </main>
  );
}