import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpen: () => void;
}

export const Modal = ({ children, isOpen, handleOpen }: IModalProps) => {
  return (
    <section
      onClick={handleOpen}
      className={cn(
        `fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-bg opacity-0 transition duration-500 cursor-pointer select-none pointer-events-none z-500`,
        {
          "opacity-100 pointer-events-auto select-auto": isOpen,
        },
      )}
    >
      {children}
    </section>
  );
};
