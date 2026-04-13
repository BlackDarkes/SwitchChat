import { MessageSend } from "@/features/message-send";
import { Container } from "@/shared/ui";

export const MessageField = () => {
  return (
    <section className="my-5">
      <Container mod="default">
        <MessageSend />
      </Container>
    </section>
  );
}