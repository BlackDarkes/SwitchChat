import { ChatAvatar } from "@/entities/chat/ui/ChatAvatar";
import { IChat } from "@/shared/types/chat.interface";
import { Modal } from "@/shared/ui";

interface IChatInfoModalProps {
  chat: IChat | undefined;
  isOpen: boolean;
  handleOpen: () => void
}

export const ChatInfoModal = ({ chat, isOpen, handleOpen }: IChatInfoModalProps) => {

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} >
      <div className="cursor-default" onClick={(e) => e.stopPropagation()}>
        <ChatAvatar chatAvatar={chat?.avatar} chatName={chat?.name} size="middle" />
        <h2>{chat?.name}</h2>
        <p>{chat?.username}</p>
        <p>{chat?.description}</p>

        <div>
          <h3>Участники</h3>
          <p>{chat?.chatMembers.length}</p>

          <ul>
            {chat?.chatMembers.map((member) => (
              <li key={member.id}>{member?.user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}