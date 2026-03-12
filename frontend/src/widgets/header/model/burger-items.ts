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
    link: "#",
    isLink: true,
  },
  {
    id: 2,
    title: "Настройки",
    link: "/settings",
    isLink: true,
  },
  {
    id: 3,
    title: "Тема",
    isLink: false,
  },
  {
    id: 4,
    title: "Свои категории",
    link: "#",
    isLink: true,
  },
  {
    id: 5,
    title: "Друзья",
    link: "/friends",
    isLink: true,
  },
  {
    id: 6,
    title: "Выход",
    isLink: false,
  }
];

export { type IBurgerItems, BURGER_ITEMS };