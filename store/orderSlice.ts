import type { CartSlice, OrderSlice, OrderT } from "../t";
import type { StateCreator } from "zustand";

const initialState: OrderT = {
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
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  OrderSlice
> = (set) => ({
  order: initialState,
  addOrderItems: (items) =>
    set((state) => ({
      order: {
        ...state.order,
        items,
      },
    })),
  setOrderDetails: (shippingType) =>
    set((state) => ({ order: { ...state.order, shippingType } })),
  resetOrder: () =>
    set((state) => ({
      order: {
        ...initialState,
        orderDetails: state.order.orderDetails,
      },
    })),
});
