export const formatChatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  if (isToday)
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (isYesterday) return "Вчера";
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
};