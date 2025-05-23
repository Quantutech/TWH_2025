import React from "react";
import Layout from "../../components/layout/Layout";
import type { Metadata } from "next";
import ClientForgotPassword from "../../components/pages/client-forgot-password/ClientForgotPassword";

export const metadata: Metadata = {
  title: "Provider Forgot Password - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "0px", sm: "0px", md: "24px 64px" },
      }}
    >
      <ClientForgotPassword />
    </Layout>
  );
};

export default page;
