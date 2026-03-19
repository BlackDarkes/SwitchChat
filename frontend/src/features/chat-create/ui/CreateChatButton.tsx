import { cn } from "@/shared/lib/utils";

interface ICreateChatButtonProps {
  onClick: () => void;
}

export const CreateChatButton = ({ onClick }: ICreateChatButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={cn(
      `p-[8px_12px] bg-primary-color text-primary-bg rounded-2xl transition duration-300  hover:bg-primary-color/80`
    )}>
      Создать чат
    </button>
  );
};
