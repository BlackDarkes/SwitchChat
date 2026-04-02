import { Modal } from "@/shared/ui";
import { ChatCreateForm } from "./ChatCreateForm";
import { useChatCreateStore } from "../model/chat-create-store";

export const ChatCreateModal = () => {
  const { isOpen, handleOpen } = useChatCreateStore();

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <ChatCreateForm />
    </Modal>
  );
};
