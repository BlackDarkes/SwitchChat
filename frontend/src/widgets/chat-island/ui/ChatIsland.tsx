"use client";

import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { useLoginStore } from "@/features/auth/model/login-store";
import { useTypeChatStore } from "@/features/switch-type-chat";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui";
import { BookOpenText, PencilLine } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export const ChatIsland = () => {
  const { user } = useLoginStore();
  const { type, setType } = useTypeChatStore();

  useEffect(() => {
    const url = window.location.href;

    if (url.includes("chats")) {
      setType("CHATS");
    } else if (url.includes("groups")) {
      setType("GROUPS");
    }
  }, [])

  return (
    <section className="m-5 w-full">
      <Container>
        <div className="flex justify-between p-[10px_25px] bg-accent-bg rounded-4xl shadow-box">
          <Link href="/chats">
            <PencilLine
              size={30}
              onClick={() => setType("CHATS")}
              className={cn(
                `duration-400 transition hover:stroke-accent-color`,
                {
                  "stroke-accent-color": type === "CHATS",
                }
              )}
            />
          </Link>
          <Link href="/groups">
            <BookOpenText
              size={30}
              onClick={() => setType("GROUPS")}
              className={cn(
                `duration-400 transition hover:stroke-accent-color`,
                {
                  "stroke-accent-color": type === "GROUPS",
                }
              )}
            />
          </Link>
          <button>
            <UserAvatar userAvatar={user?.avatar} userName={user?.name} />
          </button>
        </div>
      </Container>
    </section>
  );
};
