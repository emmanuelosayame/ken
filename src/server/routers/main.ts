import { router } from "../trpc";
import { orderRouter } from "./order";
import { itemRouter } from "./item";

export const appRouter = router({
  item: itemRouter,
  order: orderRouter,
  //   store: storeRouter,
  //   vendor: vendorRouter,
  //   order: orderRouter,
  //   customer: customerRouter,
  //   category: categoryRouter,
  //   asset: assetRouter,
  //   notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
