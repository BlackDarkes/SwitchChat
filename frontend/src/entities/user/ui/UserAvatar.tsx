import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface IUserAvatarProps {
  userAvatar: string | undefined | null;
  userName: string;
}

export const UserAvatar = ({ userAvatar, userName }: IUserAvatarProps) => {
  return (
    <>
      {userAvatar ? (
        <Image
          src={userAvatar}
          alt="avatar"
          width={60}
          height={60}
          className={cn(`w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)] cursor-pointer`)}
        />
      ) : (
        <div
          className={cn(
            `flex justify-center items-center w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)] bg-primary-color text-primary-bg uppercase font-bold rounded-full cursor-pointer`,
          )}
        >
          {userName?.slice(0, 1)}
        </div>
      )}
    </>
  );
};
