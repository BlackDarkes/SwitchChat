import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface IUserAvatarProps {
  userAvatar: string | undefined | null;
  userName: string | undefined;
  isAvatar?: boolean;

  handleOpen?: () => void;
}

export const UserAvatar = ({
  userAvatar,
  userName,
  isAvatar = false,
  handleOpen,
}: IUserAvatarProps) => {
  return (
    <>
      {userAvatar ? (
        <Image
          src={userAvatar}
          alt="avatar"
          width={60}
          height={60}
          className={cn(
            "w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)] cursor-pointer",
            {
              "cursor-default": isAvatar,
            },
          )}
          onClick={handleOpen}
        />
      ) : (
        <div
          className={cn(
            "flex justify-center items-center",
            "w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)] bg-primary-color text-primary-bg uppercase font-bold rounded-full",
            "cursor-pointer",
            {
              "cursor-default": isAvatar,
            }
          )}
          onClick={handleOpen}
        >
          {userName?.slice(0, 1)}
        </div>
      )}
    </>
  );
};
