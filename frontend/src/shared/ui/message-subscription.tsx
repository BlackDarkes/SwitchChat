import { cn } from "../lib/utils";

export const MessageSubscription = () => {
  return (
    <div className={cn(
      "flex items-center justify-center py-5 bg-primary-bg text-inactive-color text-[clamp(16px,1.4vw,18px)]",
    )}>
      <p className={cn(
        "rounded-full",
      )}>Вы подписаны на канал</p>
    </div>
  );
}