import { ButtonChatLeave } from "@/features/chat-leave";
import { cn } from "@/shared/lib/utils";
import { useParams } from "next/navigation";

interface IChatActionMenuProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export const ChatActionMenu = ({ isOpen, handleOpen }: IChatActionMenuProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <section
      onClick={handleOpen}
      className={cn(
        "fixed inset-0 z-40 transition-opacity duration-200 ease-out",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute top-14 right-4 md:right-6 w-48 max-w-[90vw] p-1.5",
          "bg-primary-bg rounded-xl shadow-shadow-box ring-1 ring-border-color/30",
          "transition-all duration-200 ease-out origin-top-right",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
        role="menu"
        aria-hidden={!isOpen}
      >
        <ButtonChatLeave id={id} onClose={handleOpen} />
      </div>
    </section>
  );
};