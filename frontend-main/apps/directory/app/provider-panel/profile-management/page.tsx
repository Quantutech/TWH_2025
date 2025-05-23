import React from "react";
import Layout from "../../../components/layout/provider-panel/Layout";
import type { Metadata } from "next";
import Content from "../../../components/pages/profile-management/Content";

export const metadata: Metadata = {
  title: "Profile Management - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Profile Management">
      <Content />
    </Layout>
  );
};

export default page;
