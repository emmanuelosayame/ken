import type { CartSlice, OrderSlice, OrderT } from "../t";
import type { StateCreator } from "zustand";

export const initialState: OrderT = {
  items: [],
  orderDetails: {
    email: "",
    name: "",
    location: "",
    phone: "",
    notes: "",
  },
};

export const orderSlice: StateCreator<
  OrderSlice & CartSlice,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/persist", unknown]
  ],
  [],
  OrderSlice
> = (set) => ({
  order: initialState,
  addOrderItems: (items) =>
    set((state) => {
      state.order.items = items;
    }),
  setOrderDetails: (details) =>
    set((state) => ({ order: { ...state.order, orderDetails: details } })),
  resetOrder: () =>
    set((state) => ({
      order: {
        ...initialState,
        orderDetails: state.order.orderDetails,
      },
    })),
});
