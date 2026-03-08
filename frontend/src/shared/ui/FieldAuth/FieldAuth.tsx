import { cn } from "@/shared/lib/utils";
import { UseFormRegisterReturn, FieldErrors, FieldError } from "react-hook-form";

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
  const fieldError = error[name] as FieldError | undefined;

  return (
    <div>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={cn(``)}
      />
      {fieldError && <p>{fieldError.message}</p>}
    </div>
  );
};
