import Layout from "@/components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "My Profile | Ken's Food",
  description: "Shawarma and Babeque",
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default PageLayout;
