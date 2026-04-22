"use client";

import { UserAvatar } from "@/entities/user";
import { useLoginStore } from "@/features/auth";
import { useProfileStore } from "@/features/profile";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui";
import { BookOpenText, PencilLine } from "lucide-react";
import { useEffect } from "react";

export const ChatIsland = () => {
  const { user } = useLoginStore();
  const { type, setType } = useTypeChatStore();
  const { openProfile } = useProfileStore();

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("chats")) setType("CHATS");
    else if (url.includes("groups")) setType("GROUPS");
  }, [setType]);

  const handleOpenProfile = () => {
    if (user) openProfile(user, true);
  };

  return (
    <section className="m-5 w-full">
      <Container>
        <div className="flex justify-between items-center p-[10px_25px] bg-accent-bg rounded-4xl shadow-box">
          <button
            type="button"
            onClick={() => setType("CHATS")}
            className={cn(
              "flex items-center justify-center w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)] rounded-full",
              "cursor-pointer transition-all duration-200 ease-out",
              "hover:bg-secondary-bg/20 hover:scale-105",
              "active:scale-95 active:bg-secondary-bg/40",
              "focus:outline-none",
            )}
          >
            <PencilLine
              size={30}
              className={cn(
                "duration-400 transition hover:stroke-accent-color",
                { "stroke-accent-color": type === "CHATS" }
              )}
            />
          </button>

          <button
            type="button"
            onClick={() => setType("GROUPS")}
            className={cn(
              "flex items-center justify-center w-[clamp(30px,4vw,40px)] h-[clamp(30px,4vw,40px)] rounded-full",
              "cursor-pointer transition-all duration-200 ease-out",
              "hover:bg-secondary-bg/20 hover:scale-105",
              "active:scale-95 active:bg-secondary-bg/40",
              "focus:outline-none"
            )}
          >
            <BookOpenText
              size={30}
              className={cn(
                "duration-400 transition hover:stroke-accent-color",
                { "stroke-accent-color": type === "GROUPS" }
              )}
            />
          </button>

          <button
            type="button"
            onClick={handleOpenProfile}
            className={cn(
              "cursor-pointer transition-all duration-200 ease-out",
              "hover:scale-105 active:scale-95 focus:outline-none"
            )}
          >
            <UserAvatar userAvatar={user?.avatar} userName={user?.name} />
          </button>
        </div>
      </Container>
    </section>
  );
};