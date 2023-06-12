import { z } from "zod";
import { contactS } from "../db/schema";
import { procedure, router } from "../trpc";

const Create = z.object({
  name: z.string().nullable(),
  emailphone: z.string(),
  message: z.string(),
});

export const contactRouter = router({
  create: procedure.input(Create).mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(contactS).values(input);
  }),
});
