import { toast } from "sonner";

export const copyName = (name: string | undefined) => {
  const text = name || "";
  if (typeof navigator === "undefined") return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Тег скопирован в буфер обмена"))
      .catch(() => fallbackCopy(text));
    return;
  }

  fallbackCopy(text);
};

const fallbackCopy = (text: string) => {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  
  try {
    document.execCommand("copy");
    toast.success("Тег скопирован в буфер обмена");
  } catch {
    toast.error("Не удалось скопировать тег");
  } finally {
    document.body.removeChild(ta);
  }
};