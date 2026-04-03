import { useAddFavorite } from "../api/add-favorite";

interface IButtonAddFavoriteProps {
  chatId: string;
}

export const ButtonAddFavorite = ({ chatId }: IButtonAddFavoriteProps) => {
  const { mutate } = useAddFavorite();

  return (
    <button type="button" onClick={() => mutate(chatId)}>
      Добавить в избранное
    </button>
  );
};
