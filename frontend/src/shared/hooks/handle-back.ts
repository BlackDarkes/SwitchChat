import { useMobileMessages } from "@/features/mobile-messages";
import { useRouter } from "next/navigation";

export const useHandleBack = () => {
  const { handleOpen } = useMobileMessages();
  const router = useRouter();

  const handleBack = () => {
    handleOpen(false);
    router.push("/");
  };

  return {
    handleBack,
  };
};
