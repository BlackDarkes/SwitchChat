import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IButtonAuthProps {
  children: ReactNode;
  className?: string;
}
  
export const ButtonAuth = ({ children, className }: IButtonAuthProps) => {
  return (
    <button type="submit" className={cn(
      `p-[12px_8px] bg-primary-bg text-primary-color rounded-2xl uppercase transition duration-300 hover:bg-primary-bg/80`,
      `active:scale-99 active:duration-75`,
      className
    )}>
      {children}
    </button>
  );
}