import { IUser } from "../types";

interface IHandleOpenProfileProps {
  user: IUser | undefined;
  handleOpen: () => void;
  setUser: (user: IUser | undefined) => void;
}

export const useHandleOpenProfile = () => {
  const handleOpenProfile = ({ user, handleOpen, setUser }: IHandleOpenProfileProps) => {
    if (user) {
      setUser(user);
    }
    handleOpen();
  };

  return { handleOpenProfile };
};
