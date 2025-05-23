import React from "react";
import Layout from "../../components/layout/admin-panel/Layout";
import ProviderListContent from "../../components/pages/proviider-list/ProviderListContent";

const page = () => {
  return (
    <Layout header="Provider List">
      <ProviderListContent />
    </Layout>
  );
};

export default page;
