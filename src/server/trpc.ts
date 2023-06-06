// import { auth } from "@lib/f-admin";
import { TRPCError, initTRPC } from "@trpc/server";
import { type Context } from "./context";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createRouteHandlerClient({ cookies });

const t = initTRPC.context<Context>().create();

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, ...data.session },
    },
  });
});

export const mergeRouters = t.mergeRouters;

export const router = t.router;

export const procedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
