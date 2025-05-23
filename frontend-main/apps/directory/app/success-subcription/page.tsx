import React from "react";
import Layout from "../../components/layout/Layout";

import type { Metadata } from "next";
import SuccessSubscription from "../../components/pages/success-subscription/SuccessSubcription";

export const metadata: Metadata = {
  title: "Success Subcription - TeleWellness Hub",
};

export default function SuccessSubcription() {
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "0px", sm: "0px", md: "24px 64px" },
      }}
    >
      <SuccessSubscription />
    </Layout>
  );
}
