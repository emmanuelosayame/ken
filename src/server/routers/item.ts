import { z } from "zod";
import { procedure, protectedProcedure, router } from "../trpc";
import { customerS, itemS } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

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

export const itemRouter = router({
  test: procedure.input(z.array(ItemS)).mutation(async ({ ctx, input }) => {
    // const {} = input;
    return await ctx.db.insert(itemS).values(input).returning();
  }),
  many: procedure.input(z.object({})).query(async ({ ctx }) => {
    return await ctx.db.select().from(itemS);
  }),
  metadata: procedure
    .input(
      z.object({
        items: z.array(
          z.object({ id: z.number(), quantity: z.number().optional() })
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      const { items } = input;
      const matched = await ctx.db
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
      return mixed;
    }),
});
