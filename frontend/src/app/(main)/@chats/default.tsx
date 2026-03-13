import { ChatList } from "@/widgets/chat-list";

export default function DefaultContent() {
  return (
    <section className="flex items-center justify-center text-primary-color">
      <ChatList />
    </section>
  );
}