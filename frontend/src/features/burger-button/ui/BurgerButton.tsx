"use client";

import { cn } from "@/shared/lib/utils";

interface IBurgerButtonProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export const BurgerButton = ({ isOpen, handleOpen }: IBurgerButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleOpen}
      className={cn(
        `
          relative flex flex-col justify-center gap-y-1 w-7.5 h-5 
          before:content-[''] before:absolute before:w-full before:h-0.5 before:transition before:duration-400 before:ease-in before:bg-primary-color
          after:content-[''] after:absolute after:w-full after:h-0.5 after:transition after:duration-400 after:ease-in after:bg-primary-color
          before:top-0
          after:bottom-0
        `,
      )}
    >
      <span className={cn(
        `
          w-full h-0.5 transition duration-400 ease-in bg-primary-color
        `
      )} />
      <span className={cn(
        `
          w-full h-0.5 transition duration-400 ease-in bg-primary-color
        `
      )} />
    </button>
  );
};
