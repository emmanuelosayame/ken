import { z } from "zod";
import { procedure, router } from "../trpc";
import { items } from "@lib/data";

export const itemRouter = router({
  many: procedure.input(z.object({})).query(async ({ ctx }) => {
    return items;
  }),
});
