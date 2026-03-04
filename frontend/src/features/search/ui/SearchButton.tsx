import { Search } from "lucide-react";

interface ISearchButtonProps {
  handleOpen: () => void;
}
  
export const SearchButton = ({ handleOpen }: ISearchButtonProps) => {
  return (
    <button type="button" onClick={handleOpen}>
      <Search size={30} className="text-primary-color" />
    </button>
  );
}