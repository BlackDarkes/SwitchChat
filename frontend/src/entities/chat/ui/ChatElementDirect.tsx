import { IChat } from "@/shared/types";
import { ChatAvatar } from "./ChatAvatar";
import { ChatElementLayout } from "./chat-layout/ChatElementLayout";
import { useLoginStore } from "@/features/auth/model/login-store";
import { memo } from "react";
import { TruncateName } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface IChatElementDirectProps {
  chat: IChat;
  handleOpen: (open: boolean) => void;
}

export const ChatElementDirect = memo(
  ({ chat, handleOpen }: IChatElementDirectProps) => {
    const { user: currentUser } = useLoginStore();
    const user =
      chat.chatMembers?.[0]?.userId === currentUser?.id
        ? chat.chatMembers?.[1]?.user
        : chat.chatMembers?.[0]?.user;

    return (
      <ChatElementLayout chat={chat} handleOpen={handleOpen}>
        <div className="flex gap-x-3.75">
          <ChatAvatar
            chatAvatar={user.avatar}
            chatName={user.name}
            size="big"
          />

          <div className="flex flex-col justify-between h-full">
            <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold">
              <TruncateName className={cn("max-w-35 max-h-7.5")}>
                {user.name}
              </TruncateName>
            </h3>
            <p className="text-[clamp(14px,1.5vw,16px)] text-secondary-color">
              <TruncateName>{chat.messages?.at(-1)?.text}</TruncateName>
            </p>
          </div>
        </div>
      </ChatElementLayout>
    );
  },
);

ChatElementDirect.displayName = "ChatElementDirect";
