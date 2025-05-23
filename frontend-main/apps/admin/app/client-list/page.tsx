import React from "react";
import Layout from "../../components/layout/admin-panel/Layout";
import ClientListContent from "../../components/pages/client-list/ClientListContent";

const page = () => {
  return (
    <Layout header="Client List">
      <ClientListContent />
    </Layout>
  );
};

export default page;
