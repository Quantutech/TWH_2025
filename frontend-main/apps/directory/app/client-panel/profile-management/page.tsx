import React from "react";
import Layout from "../../../components/layout/client-panel/Layout";
import ClientProfileManagement from "../../../components/pages/client-profile-management/ClientProfileManagement";

const page = () => {
  return (
    <Layout header="Profile Management">
      <ClientProfileManagement />
    </Layout>
  );
};

export default page;
