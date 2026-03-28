import { cn } from "@/shared/lib/utils";
import { IBurgerItems } from "../../model/burger-items";
import { BurgerMenuItem } from "./BurgerMenuItem";

interface IBurgerMenuProps {
  items: IBurgerItems[];
  isOpen: boolean;
  handleOpen: () => void;
  handleSettingsOpen: () => void;
  handleCreateChatOpen: () => void;
  handleMobileMessagesOpen: (open: boolean) => void;
}

export const BurgerMenu = ({
  items,
  isOpen,
  handleOpen,
  handleSettingsOpen,
  handleCreateChatOpen,
  handleMobileMessagesOpen,
}: IBurgerMenuProps) => {
  return (
    <div
      onClick={handleOpen}
      className={cn(
        `
          fixed top-0 left-0 w-full h-full bg-opacity-bg -translate-x-[105%] transition duration-500 cursor-pointer
        `,
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={cn(
          `
            flex flex-col gap-y-10 pt-[clamp(90px,10vh,100px)] px-5 w-[min(100%,450px)] h-full bg-search-bg rounded-[0_0_24px_0] text-[clamp(18px,1.4vw,20px)] shadow-box cursor-default
          `,
        )}
      >
        {items.map((item) => (
          <BurgerMenuItem
            key={item.id}
            item={item}
            handleOpen={handleOpen}
            handleSettingsOpen={handleSettingsOpen}
            handleCreateChatOpen={handleCreateChatOpen}
            handleMobileMessagesOpen={handleMobileMessagesOpen}
          />
        ))}
      </ul>
    </div>
  );
};
