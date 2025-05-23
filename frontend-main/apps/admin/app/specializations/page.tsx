import React from "react";
import Layout from "../../components/layout/admin-panel/Layout";
import SpecialitiesContent from "../../components/pages/specializations/SpecialitiesContent";

const page = () => {
  return (
    <Layout header="Specializations">
      <SpecialitiesContent />
    </Layout>
  );
};

export default page;
