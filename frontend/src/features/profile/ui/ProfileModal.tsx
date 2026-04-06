import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { copyName } from "@/shared/model/copy-name";
import { IUser } from "@/shared/types/user.interface";
import { Modal } from "@/shared/ui";

interface IProfileModalProps {
  user: IUser | undefined;
  isOpen: boolean;
  handleOpen: () => void;
}

export const ProfileModal = ({
  user,
  isOpen,
  handleOpen,
}: IProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div
        className={cn("flex flex-col items-center gap-y-2.5")}
        onClick={(e) => e.stopPropagation()}
      >
        <UserAvatar
          userAvatar={user?.avatar}
          userName={user?.name}
          isAvatar={true}
          size="big"
        />

        <h3 className={cn("text-[clamp(20px,1.5vw,24px)]")}>{user?.name}</h3>

        <div className={cn("flex flex-col gap-y-5 w-[min(100%,250px)]")}>
          <div>
            <p>{user?.email}</p>
            <span className="text-[14px] text-secondary-color select-none">Почта</span>
          </div>

          {user?.bio && (
            <div>
              <p>{user?.bio}</p>
              <span className="text-[14px] text-secondary-color select-none">Описание</span>
            </div>
          )}

          <div>
            <p className={cn("cursor-pointer")} onClick={() => copyName(user?.username)}>{user?.username}</p>
            <span className="text-[14px] text-secondary-color select-none">Тег</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
