import { useRemoveFavorite } from "../api/remove-favorite";

interface IButtonRemoveFavoriteProps {
  chatId: string
}
  
export const ButtonRemoveFavorite = ({ chatId }: IButtonRemoveFavoriteProps) => {
  const { mutate } = useRemoveFavorite();

  return (
    <button type="button" onClick={() => mutate(chatId)}>
      Удалить из избранного
    </button>
  );
}