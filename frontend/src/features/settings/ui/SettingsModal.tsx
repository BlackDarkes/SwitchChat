import { cn } from "@/shared/lib/utils";
import { Modal } from "@/shared/ui";

interface ISettingsModalProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export const SettingsModal = ({ isOpen, handleOpen }: ISettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen}>
      <div className={cn(
        "cursor-default"
      )} onClick={(e) => e.stopPropagation()}>
        <h2 className={cn(
          "text-center"
        )}>Настройки</h2>

        <div className={cn("w-full mt-7.5")}>
          <label htmlFor="type" className={cn("block mb-2 ml-2.5")}>
            Язык мессенджера
          </label>
          <select
            defaultValue="GROUP"
            id="type"
            className={cn(
              "w-full text-primary-color py-2 px-3 bg-primary-bg rounded-md border border-primary-color",
            )}
          >
            <option value="GROUP">Русский</option>
            <option value="CHANNEL">Английский</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};
