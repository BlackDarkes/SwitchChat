import { CirclePlus } from "lucide-react";
import { useContactAdd } from "../api/contact-add";
import { useSearchUserStore } from "@/features/search";

interface IButtonContactAddProps {
  id: string;
}

export const ButtonContactAdd = ({ id }: IButtonContactAddProps) => {
  const { mutate: addContact } = useContactAdd();
  const { handleOpen } = useSearchUserStore();

  const handleAddContact = (contactId: string) => {
    addContact(contactId);
    handleOpen(false);
  };

  return (
    <button type="button" onClick={() => handleAddContact(id)}>
      <CirclePlus />
    </button>
  );
};
