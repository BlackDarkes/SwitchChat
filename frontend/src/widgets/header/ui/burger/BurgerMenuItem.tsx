import Link from "next/link";
import { IBurgerItems } from "../../model/burger-items";

interface IBurgerMenuItemProps {
  item: IBurgerItems;
}

export const BurgerMenuItem = ({ item }: IBurgerMenuItemProps) => {
  return (
    <li>
      {item.isLink ? (
        <Link href={item.link || ""}>{item.title}</Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
          }}
        >
          {item.title}
        </button>
      )}
    </li>
  );
};
