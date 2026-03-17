import { Modal } from "@/shared/ui";

interface ISettingsModalProps {
  isOpen: boolean;
  handleOpen: () => void;
}
  
export const SettingsModal = ({ isOpen, handleOpen }: ISettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div className="cursor-default" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
      </div>
    </Modal>
  );
}