import Layout from "../../components/layout/Layout";
import AreUProvider from "../../components/provider-benefits/AreUProvider";
import HowItWorks from "../../components/provider-benefits/HowItWorks";
import JoinPlatform from "../../components/provider-benefits/JoinPlatform";
import PricingPlans from "../../components/provider-benefits/pricing-plans/PricingPlans";
import TrustedExperts from "../../components/provider-benefits/TrustedExperts";
import WhatHubOffers from "../../components/provider-benefits/WhatHubOffers";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

export default function ProviderBenefits() {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Provider Benefits" }}
        containerProps={{ pt: "16px" }}
      />
      <AreUProvider />
      <WhatHubOffers />
      <HowItWorks />
      <PricingPlans />
      <JoinPlatform />
      <TrustedExperts />
    </Layout>
  );
}
