"use client";

import { UserAvatar } from "@/entities/user/ui/UserAvatar";
import { useLoginStore } from "@/features/auth/model/login-store";
import { Container } from "@/shared/ui";
import { BookOpenText, PencilLine } from "lucide-react";

export const ChatIsland = () => {
  const { user } = useLoginStore();

  return (
    <section className="m-5 w-full">
      <Container>
        <div className="flex justify-between p-[10px_25px] bg-accent-bg rounded-4xl shadow-box">
          <button>
            <PencilLine size={30} />
          </button>
          <button>
            <BookOpenText size={30} />
          </button>
          <button>
            <UserAvatar userAvatar={user?.avatar} userName={user?.name} />
          </button>
        </div>
      </Container>
    </section>
  );
};
