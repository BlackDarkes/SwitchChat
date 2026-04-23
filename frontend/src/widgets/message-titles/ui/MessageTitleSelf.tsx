"use client";

import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../../../shared/hooks/handle-back";
import { cn } from "@/shared/lib/utils";

export const MessageTitleSelf = () => {
  const { handleBack } = useHandleBack();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex w-full items-center px-1">
        <h3 className={cn(
          "text-lg font-bold text-primary-color",
          "md:text-xl"
        )}>
          Избранное
        </h3>
      </div>
    </MessageTitleLayout>
  );
};
