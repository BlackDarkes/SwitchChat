import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";
import { SearchButton, useSearchUserStore } from "@/features/search";

export const MessageTitleContacts = () => {
  const { handleBack } = useHandleBack();
  const { handleOpen } = useSearchUserStore();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[clamp(20px,2.5vw,24px)]">Друзья</h3>
        <SearchButton handleOpen={handleOpen} />
      </div>
    </MessageTitleLayout>
  );
}