import Layout from "@/components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Menu | Ken's Food",
  description: "Shawarma and Babeque",
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default PageLayout;
