// import { auth } from "@lib/f-admin";
import { TRPCError, initTRPC } from "@trpc/server";
import { type Context } from "./context";
// import { getAuth } from "@clerk/nextjs/server";

const t = initTRPC.context<Context>().create();

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  //   const auth = getAuth(ctx.req);
  //   if (!auth) {
  //     throw new TRPCError({ code: "UNAUTHORIZED" });
  //   }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {},
    },
  });
});

export const mergeRouters = t.mergeRouters;

export const router = t.router;

export const procedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
