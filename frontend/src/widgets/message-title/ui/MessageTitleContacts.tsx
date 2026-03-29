import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";
import { SearchButton, useSearchUserStore } from "@/features/search";
import { CloseButton } from "@/shared/ui";

export const MessageTitleContacts = () => {
  const { handleBack } = useHandleBack();
  const { isOpen, handleOpen } = useSearchUserStore();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[clamp(20px,2.5vw,24px)]">Друзья</h3>
        { isOpen ? (
          <CloseButton handleClose={() => handleOpen(false)} />
        ) : (
          <SearchButton handleOpen={() => handleOpen(true)} />
        ) }
      </div>
    </MessageTitleLayout>
  );
}