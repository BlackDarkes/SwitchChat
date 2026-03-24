import { cn } from "@/shared/lib/utils";
import { CloseButton } from "@/shared/ui";

interface IToastProps {
  isOpen: boolean;
  message: string;
  type: "success" | "error";
  handleClose: () => void;
}

export const Toast = ({ isOpen, message, type, handleClose }: IToastProps) => {
  return (
    <section>
      <div
        className={cn(
          `fixed bottom-[clamp(20px,4vw,30px)] right-[clamp(20px,4vw,40px)] `,
          `flex items-center justify-center px-[clamp(15px,2vw,20px)_60px] py-[clamp(10px,2vw,20px)]`,
          `w-[clamp(250px,30vw,300px)] bg-primary-bg text-primary-color rounded-full`,
          `shadow-box translate-y-[200%] duration-400 transition-all z-500`,
          {
            "translate-y-0": isOpen,
          }
        )}
      >
        <CloseButton handleClose={handleClose} />
        <p>{message}</p>
      </div>
    </section>
  );
};
