import { contactS } from "../db/schema";
import { procedure, router } from "../trpc";
import { createContact } from "../zod";

export const contactRouter = router({
  create: procedure.input(createContact).mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(contactS).values(input);
  }),
});
