import React from "react";
import Layout from "../../components/layout/Layout";
import ProviderSignIn from "../../components/pages/ProviderSignIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Sign In - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "0px", sm: "0px", md: "24px 64px" },
      }}
    >
      <ProviderSignIn />
    </Layout>
  );
};

export default page;
