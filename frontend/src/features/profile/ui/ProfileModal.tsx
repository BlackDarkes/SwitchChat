import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { IUser } from "@/shared/types/user.interface";
import { Modal } from "@/shared/ui";

interface IProfileModalProps {
  user: IUser | undefined;
  isOpen: boolean;
  handleOpen: () => void;
}

export const ProfileModal = ({ user, isOpen, handleOpen }: IProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div className="cursor-default" onClick={(e) => e.stopPropagation()}>
        <UserAvatar userAvatar={user?.avatar} userName={user?.name} isAvatar={true} />
        <h2>{user?.name}</h2>

        <p>{user?.email}</p>
        
        <p>{user?.bio}</p>

        <p>{user?.username}</p>
      </div>
    </Modal>
  );
};
