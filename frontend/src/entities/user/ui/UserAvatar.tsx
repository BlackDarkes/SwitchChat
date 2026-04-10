import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { memo } from "react";

interface IUserAvatarProps {
  userAvatar: string | undefined | null;
  userName: string | undefined;
  isAvatar?: boolean;
  size?: "middle" | "big";

  handleOpen?: () => void;
}

export const UserAvatar = memo(({
  userAvatar,
  userName,
  isAvatar = false,
  size = "middle",
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
            "cursor-pointer",
            {
              "cursor-default": isAvatar,
              "w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)]": size === "middle",
              "w-[clamp(40px,4vw,50px)] h-[clamp(40px,4vw,50px)]": size === "big",
            },
          )}
          onClick={handleOpen}
        />
      ) : (
        <div
          className={cn(
            "flex justify-center items-center",
            "bg-primary-color text-primary-bg uppercase font-bold rounded-full",
            "cursor-pointer",
            {
              "cursor-default": isAvatar,
              "w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)]": size === "middle",
              "w-[clamp(40px,4vw,50px)] h-[clamp(40px,4vw,50px)]": size === "big",
            }
          )}
          onClick={handleOpen}
        >
          {userName?.slice(0, 1)}
        </div>
      )}
    </>
  );
});

UserAvatar.displayName = "UserAvatar";