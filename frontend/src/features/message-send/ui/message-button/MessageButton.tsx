import { Send } from "lucide-react";

export const MessageButton = () => {
  return (
    <button type="submit">
      <Send size={30} className="duration-400 transition hover:stroke-accent-color" />
    </button>
  );
}