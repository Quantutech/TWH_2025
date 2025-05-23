import React from "react";
import Layout from "../../components/layout/Layout";
import type { Metadata } from "next";
import ProviderForgotPassword from "../../components/pages/provider-forgot-password/ProviderForgotPassword";

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
      <ProviderForgotPassword />
    </Layout>
  );
};

export default page;
