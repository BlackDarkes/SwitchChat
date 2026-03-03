"use client";

import { cn } from "@/shared/lib/utils";
import { ChangeEvent } from "react";

interface ISearchInputProps {
  value: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export const SearchInput = ({ value, handleInput, id }: ISearchInputProps) => {
  return (
    <input
      type="search"
      id={id}
      value={value}
      onChange={handleInput}
      placeholder="Поиск...."
      className={cn(
        `
          bg-search-bg w-full rounded-md py-2.5 px-3.75 text-[clamp(14px,1.4vw,16px)] text-primary-color placeholder:text-placeholder-color
        `
      )}
    />
  );
};
