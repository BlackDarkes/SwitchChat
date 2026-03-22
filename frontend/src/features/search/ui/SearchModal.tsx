import { cn } from "@/shared/lib/utils";
import { IChat } from "@/shared/types/chat.interface";
import Link from "next/link";

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
  return (
    <div
      className={cn(
        `fixed top-[clamp(83px,10vh,86px)] left-0 w-[min(100%,760px)] h-full bg-primary-bg`,
        isOpen ? "block" : "hidden",
      )}
    >
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link
              href={`/chat/${chat.id}`}
              onClick={() => {
                handleOpen(false);
                setSearchInput("");
              }}
            >
              {chat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
