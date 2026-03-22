import { X } from "lucide-react";

interface ICloseButtonProps {
  readonly handleClose: () => void;
}
  
export const CloseButton = ({ handleClose }: ICloseButtonProps) => {
  return (
    <button onClick={handleClose} className="absolute tot-5 right-5">
      <X size={30} />
    </button>
  );
}