import { type inferAsyncReturnType } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import prisma from "../server/prisma";

// interface Session {
//   auth: SignedInAuthObject | SignedOutAuthObject;
// }

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req } = opts;

  return {
    prisma,
    req,
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
