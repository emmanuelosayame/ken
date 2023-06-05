"use client";

import { SWRConfig } from "swr";

const RootClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>{children}</SWRConfig>
  );
};

export default RootClient;
