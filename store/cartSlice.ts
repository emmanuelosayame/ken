import { OrderSlice, type CartSlice } from "../t";
// import { type CustomerSlice } from "t/customer";
import { type StateCreator } from "zustand";
// import { type UISlice } from "../t/ui";

export const cartSlice: StateCreator<
  CartSlice & OrderSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  CartSlice
> = (set, get) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const itemInCart = state.cart.find((oldItem) => oldItem.id === item.id);
      if (!itemInCart) return { cart: [...state.cart, item] };
      return {
        cart: [
          ...state.cart.filter((oldItem) => oldItem.id !== item.id),
          { ...itemInCart, quantity: itemInCart.quantity + 1 },
        ],
      };
    });
  },
  modifyQ: (itemId, quantity) => {
    set((state) => {
      const item = state.cart.find((oldItem) => oldItem.id === itemId);
      if (item) item.quantity = quantity;
    });
  },
  removeItem: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => itemId !== item.id),
    })),
  removeItems: (items) =>
    set((state) => ({
      cart: state.cart.filter((x) => !items.includes(x.id)),
    })),
  // removeAll: () => set(() => ({ cart: [] })),
  // incrementCartQ: (itemId) =>
  //   set((state) => {
  //     const item = state.cart.find((oldItem) => oldItem.id === itemId);
  //     if (item) item.quantity += 1;
  //   }),
  // decrementCartQ: (itemId) =>
  //   set((state) => {
  //     const item = state.cart.find((oldItem) => oldItem.id === itemId);
  //     if (item) item.quantity -= 1;
  //   }),
});
