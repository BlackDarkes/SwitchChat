"use client";

import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";

export const MessageTitleSelf = () => {
  const { handleBack } = useHandleBack();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex w-full items-center px-1">
        <h3 className="text-lg font-bold text-primary-color md:text-xl">Избранное</h3>
      </div>
    </MessageTitleLayout>
  );
};