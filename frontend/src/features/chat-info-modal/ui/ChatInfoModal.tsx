import { ChatMemberElement } from "@/entities/chat";
import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { useProfileStore } from "@/features/profile";
import { useHandleOpenProfile } from "@/shared/hooks/handle-open-profile";
import { copyName } from "@/shared/model/copy-name";
import { IChat } from "@/shared/types";
import { Modal } from "@/shared/ui";

interface IChatInfoModalProps {
  chat: IChat | undefined;
  isOpen: boolean;
  handleOpen: () => void;
}

export const ChatInfoModal = ({ chat, isOpen, handleOpen }: IChatInfoModalProps) => {
  const { openProfile } = useProfileStore();
  const { handleOpenProfile } = useHandleOpenProfile();

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div
        className="flex w-full max-w-[320px] flex-col gap-6 px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex flex-col items-center gap-3 -mt-1">
          <ChatAvatar chatAvatar={chat?.avatar} chatName={chat?.name} size="big" />
          <h3 className="text-xl font-bold text-center text-primary-color truncate max-w-full">
            {chat?.name}
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => copyName(chat?.username)}
              className="w-fit text-sm text-accent-color hover:underline focus:outline-none transition-colors"
              title="Скопировать тег"
            >
              @{chat?.username}
            </button>
            <span className="text-xs text-secondary-color select-none">Тег</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-primary-color leading-relaxed wrap-break-word">
              {chat?.description || (
                <span className="text-secondary-color italic">Нет описания</span>
              )}
            </p>
            <span className="text-xs text-secondary-color select-none">Описание</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 border-t border-border-color/50">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-medium text-secondary-color">Участники</h4>
            <span className="text-sm font-semibold text-primary-color">
              {chat?.chatMembers?.length || 0}
            </span>
          </div>

          <ul className="flex flex-col gap-2 p-px max-h-48 overflow-y-auto custom-scroll pr-1">
            {chat?.chatMembers?.map((member) => (
              <ChatMemberElement
                key={member.id}
                chatMember={member}
                handleOpenProfile={() =>
                  handleOpenProfile({
                    user: member.user,
                    handleOpen: openProfile,
                  })
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};