import { ChatElement, ChatElementDirect } from "@/entities/chat";
import { useMobileMessages } from "@/features/mobile-messages";
import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types";
import { Container } from "@/shared/ui";

interface ISearchModalProps {
  chats: IChat[];
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  setSearchInput: (value: string) => void;
}

export const SearchModal = ({
  chats,
  isOpen,
  handleOpen,
  setSearchInput,
}: ISearchModalProps) => {
  const { handleOpen: handleMobileMessagesOpen } = useMobileMessages();

  const handleChatOpen = () => {
    handleOpen(false);
    handleMobileMessagesOpen(false);
    setSearchInput("");
  };

  return (
    <div
      className={cn(
        "fixed top-[clamp(83px,10vh,86px)] left-0 py-2.5",
        "w-[clamp(400px,45vw,760px)] h-[calc(100dvh-86px)] bg-primary-bg border-r-2 border-border-color",
        "overflow-y-auto custom-scroll opacity-0 pointer-events-none duration-400 transition-all z-300",
        {
          "opacity-100 pointer-events-auto select-auto": isOpen
        }
      )}
    >
      <Container>
        <ul className={cn("flex flex-col gap-y-4 max-md:h-fit ")}>
          {chats.map((chat) => {
            return chat.type === "DIRECT" ? (
              <ChatElementDirect
                key={chat.id}
                chat={chat}
                handleOpen={handleChatOpen}
              />
            ) : (
              <ChatElement
                key={chat.id}
                chat={chat}
                handleOpen={handleChatOpen}
              />
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
