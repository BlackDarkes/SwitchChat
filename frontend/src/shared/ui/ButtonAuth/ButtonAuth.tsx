import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IButtonAuthProps {
  children: ReactNode;
  className?: string;
}
  
export const ButtonAuth = ({ children, className }: IButtonAuthProps) => {
  return (
    <button type="submit" className={cn(
      ``,
      className
    )}>
      {children}
    </button>
  );
}