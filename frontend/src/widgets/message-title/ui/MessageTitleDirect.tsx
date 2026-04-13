import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";
import { EllipsisVertical } from "lucide-react";
import {
  ChatActionMenu,
  useChatActionMenuStore,
} from "@/features/chat-action-menu";
import { useLoginStore } from "@/features/auth/model/login-store";
import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { useProfileStore } from "@/features/profile";
import { IChat } from "@/shared/types";

interface IMessageTitleDirectProps {
  chat: IChat | undefined;
}

export const MessageTitleDirect = ({ chat }: IMessageTitleDirectProps) => {
  const { handleBack } = useHandleBack();
  const { isOpen: isOpenChatAction, handleOpen: handleOpenChatAction } =
    useChatActionMenuStore();
  const { user } = useLoginStore();
  const { handleOpen, setUser } = useProfileStore();
  const currentChatMember = chat?.chatMembers[0].user.id === user?.id ? chat?.chatMembers[1] : chat?.chatMembers[0];

  const handleOpenProfile = () => {
    if (currentChatMember) {
      setUser(currentChatMember.user);
    }
    handleOpen();
  };

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div onClick={handleOpenProfile} className="flex items-center gap-x-2.5 cursor-pointer">
        <UserAvatar
          userAvatar={currentChatMember?.user.avatar}
          userName={currentChatMember?.user.name}
          size="big"
        />

        <div className="">
          <h3>{currentChatMember?.user.name}</h3>
        </div>
      </div>

      <button className="ml-auto w-[clamp(25px,4vw,30px)] h-[clamp(25px,4vw,30px)]" type="button" onClick={handleOpenChatAction}>
        <EllipsisVertical className="w-full h-full" />
      </button>

      <ChatActionMenu
        isOpen={isOpenChatAction}
        handleOpen={handleOpenChatAction}
      />
    </MessageTitleLayout>
  );
};
