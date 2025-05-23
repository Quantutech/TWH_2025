import React from "react";
import Layout from "../../components/layout/Layout";
import ClientSignUp from "../../components/pages/ClientSignUp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Sign Up - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "16px 16px", sm: "20px 32px", md: "24px 64px" },
      }}
    >
      <ClientSignUp />
    </Layout>
  );
};

export default page;
