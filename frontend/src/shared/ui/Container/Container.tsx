import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  className?: string
}
  
export const Container = ({ children, className }: IContainerProps) => {
  return (
    <div className={`mx-auto w-[min(100%-40px,1440px)] ${className}`}>
      { children }
    </div>
  );
}