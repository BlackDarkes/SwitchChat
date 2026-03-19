import { cn } from "@/shared/lib/utils";

interface IChatActionMenuProps {
  isOpen: boolean;
}

export const ChatActionMenu = ({ isOpen }: IChatActionMenuProps) => {
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
        <button className="p-[8px_12px] bg-primary-color text-primary-bg rounded-2xl transition duration-300  hover:bg-primary-color/80">
          Выйти
        </button>
      </div>
    </section>
  );
};
