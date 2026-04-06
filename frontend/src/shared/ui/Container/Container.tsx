import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  mod?: "default" | "container";
  className?: string;
}
  
export const Container = ({ children, className, mod="container" }: IContainerProps) => {
  return (
    <div className={cn(
      `mx-auto`,
      className,
      {
        "w-[min(100%-40px,1440px)] max-lg:w-[min(100%-20px,100%)]": mod === "container",
        "w-[min(100%-40px,100%)] max-lg:w-[min(100%-20px,100%)]": mod === "default",
      }
    )}>
      { children }
    </div>
  );
}