import React from "react";
import Layout from "../../../components/layout/provider-panel/Layout";
import type { Metadata } from "next";
import ListOfNotificitons from "../../../components/pages/notifications/ListOfNotificitons";

export const metadata: Metadata = {
  title: "Notifications - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Notifications">
      <ListOfNotificitons />
    </Layout>
  );
};

export default page;
