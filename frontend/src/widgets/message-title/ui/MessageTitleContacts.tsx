"use client";

import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";
import { SearchButton, useSearchUserStore } from "@/features/search";
import { CloseButton } from "@/shared/ui";

export const MessageTitleContacts = () => {
  const { handleBack } = useHandleBack();
  const { isOpen, handleOpen } = useSearchUserStore();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex w-full items-center justify-between px-1">
        <h3 className="text-lg font-bold text-primary-color md:text-xl">Друзья</h3>
        
        {isOpen ? (
          <CloseButton 
            handleClose={() => handleOpen(false)} 
          />
        ) : (
          <SearchButton 
            handleOpen={() => handleOpen(true)} 
          />
        )}
      </div>
    </MessageTitleLayout>
  );
};