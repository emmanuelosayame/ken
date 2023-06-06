import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/routers/main";
import { getBaseUrl } from "@lib/helpers";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,

      // You can pass any HTTP headers you wish here
    }),
  ],
});
