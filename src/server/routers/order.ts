import { z } from "zod";
import { procedure, router } from "../trpc";
import { db } from "../drizzle";
import { itemS, orderS } from "../db/schema";
import { asc, eq, inArray } from "drizzle-orm";
import { sum } from "lodash";

const orderStatus = z.enum([
  "pending",
  "paid",
  "prepared",
  "delivered",
  "issues",
]);

const createInput = z.object({
  data: z.object({
    orderId: z.string(),
    description: z.string(),
    total: z.number(),
    status: orderStatus,
  }),
});

const manyInput = z.object({
  limit: z.number().optional(),
  status: orderStatus.optional(),
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
  // place: procedure.input(PlaceOrderS).mutation(async ({ ctx, input }) => {}),
  many: procedure.input(manyInput).query(async ({ ctx, input }) => {
    const { limit } = input;
    return await ctx.db
      .select()
      .from(orderS)
      .limit(limit || 10);
  }),
  manyA: procedure.input(manyInput).query(async ({ ctx, input }) => {
    const { limit, status } = input;
    return await ctx.db
      .select()
      .from(orderS)
      .where(status ? eq(orderS.status, status) : undefined)
      .orderBy(asc(orderS.created_at))
      .limit(limit || 10);
  }),
  createA: procedure.input(createInput).mutation(async ({ ctx, input }) => {
    const { data } = input;
    return await ctx.db.insert(orderS).values(data).returning();
  }),
});
