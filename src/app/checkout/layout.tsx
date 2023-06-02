import Layout from "@/components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Checkout | Ken's Food",
  description: "checkout",
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default PageLayout;
