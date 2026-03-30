import { CirclePlus } from "lucide-react";
import { useContactAdd } from "../api/contact-add";

interface IButtonContactAddProps {
  id: string;
}

export const ButtonContactAdd = ({ id }: IButtonContactAddProps) => {
  const { mutate: addContact } = useContactAdd();

  const handleAddContact = (contactId: string) => addContact(contactId);

  return (
    <button type="button" onClick={() => handleAddContact(id)}>
      <CirclePlus />
    </button>
  );
};
