"use client";

import { cn } from "@/shared/lib/utils";
import { ChangeEvent } from "react";
import { Search } from "lucide-react";

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
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-placeholder-color pointer-events-none" />
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
          "bg-search-bg w-full rounded-md py-2.5 pl-9 pr-3.75",
          "text-[clamp(14px,1.4vw,16px)] text-primary-color placeholder:text-placeholder-color",
          "focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition-all"
        )}
        autoComplete="off"
      />
    </div>
  );
};