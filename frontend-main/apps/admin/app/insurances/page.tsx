import React from "react";
import Layout from "../../components/layout/admin-panel/Layout";
import InsuranceContent from "../../components/pages/insurances/InsuranceContent";

const page = () => {
  return (
    <Layout header="Insurances">
      <InsuranceContent />
    </Layout>
  );
};

export default page;
