"use client";

import { useState } from "react";
import {
  Modal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Languages } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ISettingsModalProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export const SettingsModal = ({ isOpen, handleOpen }: ISettingsModalProps) => {
  const [language, setLanguage] = useState<string>("ru");

  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div
        className="flex w-full max-w-[320px] flex-col gap-6 px-4 py-6"
      >
        <div className="flex items-center gap-2 justify-center pb-4 border-b border-border-color/50">
          <Languages size={20} className="text-secondary-color" />
          <h2 className="text-lg font-bold text-primary-color">Настройки</h2>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-secondary-color">
            Язык интерфейса
          </label>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className={cn(
              "w-full border-border-color bg-primary-bg text-primary-color transition-colors",
              "focus:ring-accent-color/50 hover:border-secondary-color/50"
            )}>
              <SelectValue placeholder="Выберите язык" />
            </SelectTrigger>

            <SelectContent className="bg-primary-bg border-border-color text-primary-color z-800">
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Modal>
  );
};
