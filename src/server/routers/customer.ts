import { z } from "zod";
import { procedure, router } from "../trpc";
import { customerS } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getBaseUrl } from "../../../lib/helpers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createRouteHandlerClient({ cookies });

export const customerCreateVS = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string().optional(),
  password: z.string(),
});

export type CustomerCreate = z.infer<typeof customerCreateVS>;

export const customerRouter = router({
  many: procedure.input(z.object({})).query(async ({ ctx }) => {
    return await ctx.db.select().from(customerS);
  }),
  create: procedure
    .input(z.object({ data: customerCreateVS }))
    .mutation(async ({ ctx, input }) => {
      const { password, ...rest } = input.data;

      const { data, error } = await supabase.auth.signUp({
        email: rest.email,
        password,
        phone: rest.phone,
        options: { emailRedirectTo: `${getBaseUrl()}/auth/callback` },
      });

      if (error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error.cause,
        });

      const uid = data.user?.id;

      if (!uid)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "unable to create user",
        });
      return await ctx.db.insert(customerS).values({ ...rest, id: uid });
    }),
});
