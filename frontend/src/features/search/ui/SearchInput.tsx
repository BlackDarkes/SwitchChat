"use client";

import { cn } from "@/shared/lib/utils";
import { ChangeEvent } from "react";

interface ISearchInputProps {
  value: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  handleOpen: (open: boolean) => void;
}

export const SearchInput = ({
  value,
  handleInput,
  id,
  handleOpen,
}: ISearchInputProps) => {
  return (
    <input
      type="search"
      id={id}
      value={value}
      onFocus={() => handleOpen(true)}
      onBlur={() => !value && handleOpen(false)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleInput(e);
        handleOpen(true);
      }}
      placeholder="Поиск...."
      className={cn(
        `
          bg-search-bg w-full rounded-md py-2.5 px-3.75 text-[clamp(14px,1.4vw,16px)] text-primary-color placeholder:text-placeholder-color
        `,
      )}
    />
  );
};
