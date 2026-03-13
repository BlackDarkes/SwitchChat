import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  mod: "default" | "contianer";
  className?: string;
}
  
export const Container = ({ children, className, mod="contianer" }: IContainerProps) => {
  return (
    <div className={cn(
      `mx-auto`,
      className,
      {
        "w-[min(100%-40px,1440px)]": mod === "contianer",
        "w-[min(100%-40px,100%)]": mod === "default",
      }
    )}>
      { children }
    </div>
  );
}