import { Cart } from "@prisma/client";

export interface OrderT {
  items: { id: string; quantity: number }[];
  orderDetails: {
    email: string;
    name: string;
    location: string;
    phone: string;
    notes: string;
  };
}

export interface OrderSlice {
  order: OrderT;
  addOrderItems: (items: OrderT["items"]) => void;
  setOrderDetails: (details: OrderT["orderDetails"]) => void;
}

export interface CartSlice {
  cart: Cart["items"];
  addToCart: (cart: Cart["items"]["0"]) => void;
  modifyQ: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  // removeItems: (itemsId: string[]) => void;
  removeAll: (id: string) => void;
}
