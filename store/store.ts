// import type { CartSlice } from "t/cart";
import { CartSlice, OrderSlice } from "../t";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { cartSlice } from "./cartSlice";
// import type { UISlice } from "../t/ui";
// import { uiSlice } from "./uiSlice";
import { orderSlice } from "./orderSlice";
// import type { CustomerSlice } from "t/customer";
// import { customerSlice } from "./customerSlice";

export const useStore = create<OrderSlice & CartSlice>()(
  immer(
    devtools(
      persist(
        (...args) => ({
          // ...uiSlice(...args),
          // ...customerSlice(...args),
          ...cartSlice(...args),
          ...orderSlice(...args),
        }),
        {
          name: "delorand",
          partialize: (state) => ({ order: state.order }),
          // getStorage: () => storage as StateStorage,
        }
      ),
      { name: "delorand" }
    )
  )
);
