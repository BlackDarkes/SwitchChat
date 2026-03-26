import { Container } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface IMessageTitleLayoutProps {
  children: ReactNode;
  handleBack: () => void;
}
  
export const  MessageTitleLayout = ({ children, handleBack }: IMessageTitleLayoutProps) => {
  return (
    <header className="py-4.25 h-[clamp(83px,11vh,86px)] bg-primary-bg border-b-2 border-border-color">
      <Container className="flex items-center gap-x-10 h-full" mod="default">
        <div className="flex items-center gap-x-10">
          <button type="button" onClick={() => handleBack()}>
            <ArrowLeft width={35} height={35} />
          </button>
        </div>

        {children}
      </Container>
    </header>
  );
}