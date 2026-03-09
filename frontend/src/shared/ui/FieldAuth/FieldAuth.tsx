import { cn } from "@/shared/lib/utils";
import { UseFormRegisterReturn, FieldErrors } from "react-hook-form";

interface IFieldAuthProps {
  type: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  error: FieldErrors;
  name: string;
}

export const FieldAuth = ({
  type,
  register,
  placeholder,
  error,
  name,
}: IFieldAuthProps) => {
  const message = error?.[name]?.message;

  return (
    <div>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={cn(``)}
      />
      {typeof message === "string" && (
        <p className="text-red-500">{message}</p>
      )}
    </div>
  );
};
