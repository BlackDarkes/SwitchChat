import { IUser } from "../types";

interface IHandleOpenProfileProps {
  user: IUser | undefined;
  handleOpen: (user: IUser | undefined, isMy: boolean) => void;
}

export const useHandleOpenProfile = () => {
  const handleOpenProfile = ({ user, handleOpen }: IHandleOpenProfileProps) => {
    handleOpen(user, false);
  };

  return { handleOpenProfile };
};
