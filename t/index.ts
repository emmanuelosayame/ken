import { Cart } from "@/server/db/schema";

export interface OrderT {
  items: { id: number; quantity: number }[];
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
  addOrderItems: (items: Cart[]) => void;
  setOrderDetails: (details: OrderT["orderDetails"]) => void;
}

export interface CartSlice {
  cart: Cart[];
  addToCart: (cart: Cart) => void;
  modifyQ: (id: number, quantity: number) => void;
  removeItem: (id: string | number) => void;
  removeItems: (itemsId: (string | number)[]) => void;
  // removeAll: () => void;
}

export interface RSCProps {
  params: { id: string };
  searchParams: { [key: string]: string };
}
