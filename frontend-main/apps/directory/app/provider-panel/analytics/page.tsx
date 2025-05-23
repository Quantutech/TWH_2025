import React from "react";
import dynamic from "next/dynamic";
import Layout from "../../../components/layout/provider-panel/Layout";
import type { Metadata } from "next";

const Analytics = dynamic(
  () => import("../../../components/pages/analytics/Analytics"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Analytics - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Analytics">
      <Analytics />
    </Layout>
  );
};

export default page;
