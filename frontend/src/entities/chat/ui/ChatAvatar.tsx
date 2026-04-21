import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { memo } from "react";

interface IChatAvatarProps {
  chatAvatar: string | undefined | null;
  chatName: string | undefined;
  size: "middle" | "big";
}

export const ChatAvatar = memo(({ chatAvatar, chatName, size }: IChatAvatarProps) => {
  return (
    <>
      {chatAvatar ? (
        <Image src={chatAvatar} alt="avatar" width={60} height={60} className={cn(
          `w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)]`,
          {
            "w-[clamp(40px,4vw,50px)] h-[clamp(40px,4vw,50px)]": size === "middle",
            "w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)]": size === "big",
          }
        )} />
      ) : (
        <div className={cn(
          "flex justify-center items-center",
          "w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)] bg-primary-color text-primary-bg uppercase font-bold rounded-full",
          {
            "w-[clamp(40px,4vw,50px)] h-[clamp(40px,4vw,50px)]": size === "middle",
            "w-[clamp(50px,4vw,60px)] h-[clamp(50px,4vw,60px)]": size === "big",
          }
        )}>
          {chatName?.slice(0, 1)}
        </div>
      )}
    </>
  );
});

ChatAvatar.displayName = "ChatAvatar";