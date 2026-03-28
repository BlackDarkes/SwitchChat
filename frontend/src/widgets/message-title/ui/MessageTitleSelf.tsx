import { MessageTitleLayout } from "@/entities/message";
import { useHandleBack } from "../model/handle-back";

export const MessageTitleSelf = () => {
  const { handleBack } = useHandleBack();

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div>
        <h3 className="text-[clamp(20px,2.5vw,24px)]">Избранное</h3>
      </div>
    </MessageTitleLayout>
  );
};
