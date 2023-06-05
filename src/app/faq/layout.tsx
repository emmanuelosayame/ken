import Layout from "@/components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Faqs | Ken's Food",
  description: "Frequently asked Questions",
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default PageLayout;
