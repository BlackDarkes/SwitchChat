import Link from "next/link";
import { IBurgerItems } from "../../model/burger-items";
import { useTheme } from "next-themes";
import {  useSyncExternalStore } from "react";

interface IBurgerMenuItemProps {
  item: IBurgerItems;
}

const emptySubscribe = () => () => {};

export const BurgerMenuItem = ({ item }: IBurgerMenuItemProps) => {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  if (!isMounted) return null

  return (
    <li>
      {item.isLink ? (
        <Link href={item.link || ""}>{item.title}</Link>
      ) : (
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {item.title}
        </button>
      )}
    </li>
  );
};
