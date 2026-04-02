import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { IChat } from "@/shared/types/chat.interface";
import { CloseButton, Modal } from "@/shared/ui";

interface IChatInfoModalProps {
  chat: IChat | undefined;
  isOpen: boolean;
  handleOpen: () => void;
}

export const ChatInfoModal = ({
  chat,
  isOpen,
  handleOpen,
}: IChatInfoModalProps) => {
  const copyName = () => {
    navigator.clipboard.writeText(chat?.username || "");
  };

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <CloseButton handleClose={handleOpen} />

      <header className="flex flex-col items-center gap-y-2.5">
        <ChatAvatar
          chatAvatar={chat?.avatar}
          chatName={chat?.name}
          size="big"
        />
        <h2 className="text-[clamp(20px,4vw,24px)]">{chat?.name}</h2>

        <section className="flex flex-col gap-y-5 w-[min(100%,250px)]">
          <div>
            <p onClick={copyName} className="cursor-pointer">
              {chat?.username}
            </p>
            <span className="text-[14px] text-secondary-color select-none">
              Тег
            </span>
          </div>
          <div>
            <p>{chat?.description}</p>
            <span className="text-[14px] text-secondary-color select-none">
              Описание
            </span>
          </div>
        </section>
      </header>

      <div className="w-full mt-10">
        <div className="flex gap-x-1.25">
          <h3 className="text-secondary-color">Участники</h3>
          <p>{chat?.chatMembers.length}</p>
        </div>

        <ul className="mt-5">
          {chat?.chatMembers.map((member) => (
            <li key={member.id}>{member?.user.name}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};
