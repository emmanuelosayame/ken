import { router } from "../trpc";
import { orderRouter } from "./order";
import { itemRouter } from "./item";
import { customerRouter } from "./customer";
import { contactRouter } from "./contact";

export const appRouter = router({
  item: itemRouter,
  order: orderRouter,
  customer: customerRouter,
  contact: contactRouter,
  //   vendor: vendorRouter,
  //   order: orderRouter,
  //   category: categoryRouter,
  //   asset: assetRouter,
  //   notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
