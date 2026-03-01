import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface IButtonProps {
  children?: ReactNode;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  icon: Icon,
  className,
  onClick,
  type = "button",
  disabled,
  loading,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} ${loading ? "cursor-wait opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"></span>}
      {Icon && <Icon />} 
      {children}
    </button>
  );
};
