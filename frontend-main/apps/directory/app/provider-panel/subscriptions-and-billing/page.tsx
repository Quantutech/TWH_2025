import React from "react";
import Layout from "../../../components/layout/provider-panel/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions & Billing - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Subscriptions & Billing">
      <>Subscriptions & Billing</>
    </Layout>
  );
};

export default page;
