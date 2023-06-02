import { Item } from "@prisma/client";

export const items: Item[] = [
  {
    title: "Big sharwarma",
    price: 3000,
    decsription: "big sharwama big sharwama big sharwama",
    id: "1",
    sold: 0,
  },
  {
    title: "Small sharwarma",
    price: 1700,
    decsription:
      "small sweet sharwama small sweet sharwamasmall sweet sharwama",
    id: "2",
    sold: 0,
  },
  {
    title: "Big barbeque",
    price: 2700,
    decsription: "sweet big barbeque sweet big barbequesweet big barbeque",
    id: "3",
    sold: 0,
  },
  {
    title: "Small barbeque",
    price: 1700,
    decsription:
      "sweet small sharwama sweet small sharwamasweet small sharwama",
    id: "4",
    sold: 0,
  },
];
