import { ChatElement, ChatElementDirect } from "@/entities/chat";
import { useMobileMessages } from "@/features/mobile-messages";
import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types";
import { Container } from "@/shared/ui";
import { Loader2, SearchX } from "lucide-react";

interface ISearchModalProps {
  chats: IChat[];
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  setSearchInput: (value: string) => void;
  isLoading?: boolean;
}

export const SearchModal = ({
  chats,
  isOpen,
  handleOpen,
  setSearchInput,
  isLoading = false,
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
        "max-md:w-full",
        {
          "opacity-100 pointer-events-auto select-auto": isOpen,
        }
      )}
    >
      <Container>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-secondary-color">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm font-medium">Ищем чаты...</span>
          </div>
        ) : chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-secondary-color">
            <SearchX className="h-8 w-8 opacity-50" />
            <span className="text-sm font-medium">Ничего не найдено</span>
          </div>
        ) : (
          <ul className="flex flex-col gap-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className="rounded-xl transition-colors hover:bg-secondary-bg/30 active:bg-secondary-bg/50"
              >
                {chat.type === "DIRECT" ? (
                  <ChatElementDirect chat={chat} handleOpen={handleChatOpen} />
                ) : (
                  <ChatElement chat={chat} handleOpen={handleChatOpen} />
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};