import { useRouter } from "next/navigation";
import { useChatLeave } from "../api/chat-leave";

interface IButtonChatLeaveProps {
  id: string;
}

export const ButtonChatLeave = ({ id }: IButtonChatLeaveProps) => {
  const { mutate: chatLeave } = useChatLeave();
  const route = useRouter();

  const handleLeave = () => {
    chatLeave(id);
    route.push("/");
  }

  return (
    <button
      onClick={handleLeave}
      className="p-[8px_8px] w-full bg-primary-color text-primary-bg rounded-2xl transition duration-300 hover:bg-primary-color/80"
    >
      Выйти
    </button>
  );
};
