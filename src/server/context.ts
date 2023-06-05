import { type inferAsyncReturnType } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { db } from "./drizzle";

// interface Session {
//   auth: SignedInAuthObject | SignedOutAuthObject;
// }

export const createContext = async (opts: {
  req: Request;
  resHeaders: Headers;
}) => {
  const { req, resHeaders } = opts;

  return {
    db,
    req,
    resHeaders,
    // session: {} as Session,
  };
};

// export const createServerContext = () => {
//   return {
//     prisma,
//     // session: {} as Session,
//   };
// };

export type Context = inferAsyncReturnType<typeof createContext>;
// export type ServerContext = inferAsyncReturnType<typeof createServerContext>;
