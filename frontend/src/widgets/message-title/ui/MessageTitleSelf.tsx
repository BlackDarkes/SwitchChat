import { MessageTitleLayout } from "@/entities/message";
import { useMobileMessages } from "@/features/mobile-messages";
import { useRouter } from "next/navigation";

export const MessageTitleSelf = () => {
  const { handleOpen } = useMobileMessages();
  const router = useRouter();

  const handleBack = () => {
    handleOpen();
    router.push("/");
  };

  return (
    <MessageTitleLayout handleBack={handleBack}>
      <div>
        <h3 className="text-[clamp(20px,2.5vw,24px)]">Избранное</h3>
      </div>
    </MessageTitleLayout>
  );
};
