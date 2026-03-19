interface IBurgerItems {
  id: number;
  title: string;
  link?: string;
  isLink: boolean;
}

const BURGER_ITEMS: IBurgerItems[] = [
  {
    id: 1,
    title: "Избранное",
    link: "/chat/hex/self",
    isLink: true,
  },
  {
    id: 2,
    title: "Настройки",
    isLink: false,
  },
  {
    id: 3,
    title: "Тема",
    isLink: false,
  },
  {
    id: 4,
    title: "Друзья",
    link: "/chat/friends",
    isLink: true,
  },
  {
    id: 5,
    title: "Создать чат",
    isLink: false,
  },
  {
    id: 6,
    title: "Выход",
    isLink: false,
  }
];

export { type IBurgerItems, BURGER_ITEMS };