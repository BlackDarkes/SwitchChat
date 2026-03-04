"use client";

import { useBurgerStore } from "@/features//burger-button/model/burger-store";
import { BurgerButton } from "@/features//burger-button/ui/BurgerButton";
import { SearchInput } from "@/features//search";
import { ChangeEvent, useState } from "react";

export const Header = () => {
  const { isOpen, handleOpen } = useBurgerStore();
  const [value, setValue] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <header className="p-5 w-[min(100%,760px)] bg-primary-bg border-b border-border-color">
      <div className="flex items-center justify-between gap-x-5">
        <BurgerButton isOpen={isOpen} handleOpen={handleOpen} />
        <SearchInput id="test" value={value} handleInput={handleInput} />
      </div>
    </header>
  );
};
