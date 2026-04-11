import { toast } from "sonner";

export const copyName = (name: string | undefined) => {
  navigator.clipboard.writeText(name || "");
  toast.success("Тег скопировано в буфер обмена");
};
