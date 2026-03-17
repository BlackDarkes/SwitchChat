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
        `absolute top-24 w-full h-full bg-accent-bg`,
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
