import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";
import { CloseButton } from "../CloseButton/CloseButton";

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
      <div
        className="relative w-[min(100%,350px)] p-5 bg-primary-bg rounded-xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton handleClose={handleOpen} />
        {children}
      </div>
    </section>
  );
};
