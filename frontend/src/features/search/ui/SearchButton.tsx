import { Search } from "lucide-react";

interface ISearchButtonProps {
  handleOpen: (open: boolean) => void;
}
  
export const SearchButton = ({ handleOpen }: ISearchButtonProps) => {
  return (
    <button type="button" onClick={() => handleOpen(true)}>
      <Search size={30} className="text-primary-color" />
    </button>
  );
}