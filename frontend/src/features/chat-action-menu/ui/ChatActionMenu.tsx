import { ButtonChatLeave } from "@/features/chat-leave";
import { cn } from "@/shared/lib/utils";
import { useParams } from "next/navigation";

interface IChatActionMenuProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export const ChatActionMenu = ({
  isOpen,
  handleOpen,
}: IChatActionMenuProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <section
      onClick={handleOpen}
      className={cn(
        "fixed inset-0 opacity-0 pointer-events-none transition-all duration-400", 
        {
          "opacity-100 pointer-events-auto select-auto": isOpen,
        }
      )}
    >
      <div
        className={cn(
          "absolute top-24 right-5 flex flex-col items-center justify-center p-3.75 w-40 bg-primary-bg rounded-2xl opacity-0 pointer-events-none transition duration-300 z-500",
          {
            "opacity-100 pointer-events-auto": isOpen,
          },
        )}
      >
        <ButtonChatLeave id={id} />
      </div>
    </section>
  );
};
