import React from "react";
import Layout from "../../components/layout/Layout";
import ProviderSignUp from "../../components/pages/ProviderSignUp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Sign Up - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "0px", sm: "0px", md: "24px 64px" },
      }}
    >
      <ProviderSignUp />
    </Layout>
  );
};

export default page;
