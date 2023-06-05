import { z } from "zod";
import { procedure, router } from "../trpc";
import { items as data } from "@lib/data";
import { db } from "../drizzle";
import { customerS, itemS } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { sum } from "lodash";

const CustomerS = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  id: z.string(),
  location: z.string(),
});

const ItemS = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export const orderRouter = router({
  checkout: procedure
    .input(
      z.object({
        items: z.array(
          z.object({ id: z.number(), quantity: z.number().optional() })
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      const { items } = input;
      const matched = await db
        .select()
        .from(itemS)
        .where(
          inArray(
            itemS.id,
            items.map((x) => x.id)
          )
        );
      const mixed = matched.map((x) => ({
        ...x,
        quantity: items.find((y) => y.id === x.id)?.quantity || 1,
      }));
      const total = sum(mixed.map((x) => x.price * x.quantity));
      return { items: mixed, total };
    }),
});
