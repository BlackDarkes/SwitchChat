export const copyName = (name: string | undefined) => {
  navigator.clipboard.writeText(name || "");
};
