"use client"

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
    <header>
      <BurgerButton isOpen={isOpen} handleOpen={handleOpen} />
      <SearchInput id="test" value={value} handleInput={handleInput} />
    </header>
  );
}