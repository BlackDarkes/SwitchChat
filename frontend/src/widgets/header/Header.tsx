"use client"

import { BurgerButton } from "@/features//burger-button/ui/BurgerButton";

export const Header = () => {
  return (
    <header>
      <BurgerButton isOpen={false} handleOpen={() => {}} />
    </header>
  );
}