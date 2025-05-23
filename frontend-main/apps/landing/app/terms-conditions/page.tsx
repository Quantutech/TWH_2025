import React from "react";
import Layout from "../../components/layout/Layout";
import JoinAsProvider from "../../components/terms-conditions/JoinAsProvider";
import TermsConditionContent from "../../components/terms-conditions/TermsConditionContent";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

const TermsandConditions = () => {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Terms & Conditions" }}
        containerProps={{ pt: "16px" }}
      />
      <TermsConditionContent />
      <JoinAsProvider />
    </Layout>
  );
};

export default TermsandConditions;
