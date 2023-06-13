"use client";
import Layout from "@/components/Layout";
import { LazyMotion } from "framer-motion";
import { ReactNode } from "react";

const domAnimation = () =>
  import("../../components/domAnimation").then((res) => res.default);

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </Layout>
  );
};

export default PageLayout;
