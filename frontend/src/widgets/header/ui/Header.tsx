"use client";

import { useBurgerStore } from "@/features//burger-button/model/burger-store";
import { BurgerButton } from "@/features//burger-button/ui/BurgerButton";
import { SearchInput } from "@/features//search";
import { ChangeEvent, useEffect, useState } from "react";
import { BurgerMenu } from "./burger/BurgerMenu";
import { BURGER_ITEMS } from "../model/burger-items";

export const Header = () => {
  const { isOpen, handleOpen } = useBurgerStore();
  const [value, setValue] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [])

  return (
    <header className="p-5 w-[min(100%,760px)] bg-primary-bg border-b-2 border-border-color">
      <div className="flex items-center justify-between gap-x-5">
        <div>
          <BurgerButton isOpen={isOpen} handleOpen={handleOpen} />
          <BurgerMenu items={BURGER_ITEMS} isOpen={isOpen} handleOpen={handleOpen} />
        </div>
        <SearchInput id="test" value={value} handleInput={handleInput} />
      </div>
    </header>
  );
};
