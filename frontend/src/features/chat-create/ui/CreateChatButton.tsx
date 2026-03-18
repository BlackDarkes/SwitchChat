import { cn } from "@/shared/lib/utils";

interface ICreateChatButtonProps {
  onClick: () => void;
}

export const CreateChatButton = ({ onClick }: ICreateChatButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={cn(``)}>
      Создать чат
    </button>
  );
};
