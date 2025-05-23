import React from "react";
import Layout from "../../components/layout/Layout";
import WelcomeBanner from "../../components/for-partners/WelcomeBanner";
import WhyPartner from "../../components/for-partners/WhyPartner";
import KeyBenefitsOfPartnering from "../../components/for-partners/KeyBenefitsOfPartnering";
import DiscoverHowYouCanMakeADifference from "../../components/for-partners/DiscoverHowYouCanMakeADifference";
import HowItWorks from "../../components/for-partners/HowItWorks";
// import PartnersInImpact from "../../components/for-partners/PartnersInImpact";
import ReadyToTransformBox from "../../components/for-partners/ReadyToTransformBox";
import PartnerForm from "../../components/for-partners/PartnerForm";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

const ForPartners = () => {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Partners Hub" }}
        containerProps={{ pt: "16px" }}
      />
      <WelcomeBanner />
      <WhyPartner />
      <KeyBenefitsOfPartnering />
      <DiscoverHowYouCanMakeADifference />
      <HowItWorks />
      {/* <PartnersInImpact /> */}
      <ReadyToTransformBox />
      <PartnerForm />
    </Layout>
  );
};

export default ForPartners;
