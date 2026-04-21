import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface IMessageTitleLayoutProps {
  children: ReactNode;
  handleBack: () => void;
}

export const MessageTitleLayout = ({
  children,
  handleBack,
}: IMessageTitleLayoutProps) => {
  return (
    <header className="py-4.25 h-[clamp(83px,11vh,86px)] bg-primary-bg border-b-2 border-border-color">
      <Container
        className={cn("flex items-center gap-x-10 h-full", "max-md:gap-x-7")}
        mod="default"
      >
        <div className="flex items-center gap-x-10">
          <button
            type="button"
            className="w-[clamp(25px,4vw,30px)] h-[clamp(25px,4vw,30px)]"
            onClick={() => handleBack()}
          >
            <ArrowLeft className="w-full h-full" />
          </button>
        </div>

        {children}
      </Container>
    </header>
  );
};
