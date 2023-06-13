import { type inferAsyncReturnType } from "@trpc/server";
import { db } from "./drizzle";
import { Session } from "@supabase/auth-helpers-nextjs";

export const createContext = async (opts: {
  req: Request;
  resHeaders: Headers;
}) => {
  const { req, resHeaders } = opts;

  return {
    db,
    req,
    resHeaders,
    session: {} as Session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
// export type ServerContext = inferAsyncReturnType<typeof createServerContext>;
