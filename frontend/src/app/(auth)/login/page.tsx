import { LoginForm } from "@/features/auth/login";
import { TestAuth } from "@/widgets/test/TestAuth";

export default function AuthPage() {
  return (
    <>
      <LoginForm />

      <TestAuth />
    </>
  );
}
