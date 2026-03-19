import { useChatLeave } from "@/entities/chat/api/useChatLeave";
import { cn } from "@/shared/lib/utils";
import { useParams } from "next/navigation";

interface IChatActionMenuProps {
  isOpen: boolean;
}

export const ChatActionMenu = ({ isOpen }: IChatActionMenuProps) => {
  const { mutateAsync: chatLeave } = useChatLeave();
  const { id } = useParams<{ id: string }>();

  const handleLeave = async () => {
    if (id) {
      await chatLeave(id);
    }
  }

  return (
    <section>
      <div
        className={cn(
          "absolute top-24 right-0 flex flex-col items-center  justify-center w-40 h-40 bg-accent-bg rounded-2xl opacity-0 pointer-events-none transition duration-300 z-500",
          {
            "opacity-100 pointer-events-auto": isOpen,
          }
        )}
      >
        <button onClick={handleLeave} className="p-[8px_12px] bg-primary-color text-primary-bg rounded-2xl transition duration-300  hover:bg-primary-color/80">
          Выйти
        </button>
      </div>
    </section>
  );
};
