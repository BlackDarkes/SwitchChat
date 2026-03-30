import { Trash2 } from "lucide-react";
import { useContactRemove } from "../api/remove-contact";

interface IButtonContactRemoveProps {
  id: string;
}

export const ButtonContactRemove = ({ id }: IButtonContactRemoveProps) => {
  const { mutate: removeContact } = useContactRemove();

  const handleRemoveContact = (contactId: string) => removeContact(contactId);

  return (
    <button type="button" onClick={() => handleRemoveContact(id)}>
      <Trash2 />
    </button>
  );
};
