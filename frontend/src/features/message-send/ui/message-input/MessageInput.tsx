import { UseFormRegisterReturn } from "react-hook-form";

interface IMessageInputProps {
  register: UseFormRegisterReturn;
}

export const MessageInput = ({
  register,
}: IMessageInputProps) => {
  return (
    <input
      {...register}
      type="text"
      id="message-input"
      placeholder="Сообщение...."
      className="w-full py-4 px-3.75 text-[clamp(14px,1.4vw,16px)] text-primary-color placeholder:text-placeholder-color "
    />
  );
};
