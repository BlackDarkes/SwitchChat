import Link from "next/link";
import { IBurgerItems } from "../../model/burger-items";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useLoginStore } from "@/features/auth/model/login-store";
import { Moon, Sun } from "lucide-react";

interface IBurgerMenuItemProps {
  item: IBurgerItems;
  handleOpen: () => void;
  hadnleSettingsOpen: () => void;
}

const emptySubscribe = () => () => {};

export const BurgerMenuItem = ({ item, handleOpen, hadnleSettingsOpen }: IBurgerMenuItemProps) => {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { logout } = useLoginStore();

  if (!isMounted) return null;

  return (
    <li>
      {item.isLink ? (
        <Link href={item.link || ""} onClick={handleOpen}>
          {item.title}
        </Link>
      ) : item.title === "Выход" ? (
        <button
          type="button"
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          {item.title}
        </button>
      ) : item.title === "Тема" ? (
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-x-2"
        >
          {item.title}

          {theme === "light" ? (
            <Sun suppressHydrationWarning />
          ) : (
            <Moon suppressHydrationWarning />
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            handleOpen();
            hadnleSettingsOpen();
          }}
        >
          {item.title}
        </button>
      )}
    </li>
  );
};
