import { useMobileMessages } from "@/features/mobile-messages";
import { Container } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

  
export const MessageTitleSelf = () => {
  const { handleOpen } = useMobileMessages();
  const router = useRouter();

  const handleBack = () => {
    handleOpen();
    router.push("/");
  };

  return (
    <header className="flex py-4.25 bg-primary-bg border-b-2 border-border-color h-[clamp(83px,11vh,86px)]">
      <Container className="flex justify-between " mod="default">
        <div className="flex items-center gap-x-10">
          <button type="button" onClick={() => handleBack()}>
            <ArrowLeft width={35} height={35} />
          </button>

          <div>
            <h3 className="text-[clamp(20px,2.5vw,24px)]">Избранное</h3>
          </div>
        </div>
      </Container>
    </header>
  );
}