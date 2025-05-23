import WelcomePodcast from "../../components/podcast/WelcomePodcast";
import Layout from "../../components/layout/Layout";
import FreeGateway from "../../components/podcast/FreeGateway";
import AvaliableApp from "../../components/podcast/AvaliableApp";
import InsideLookProviders from "../../components/podcast/InsideLookProviders";
import WhyTuneIn from "../../components/podcast/WhyTuneIn";
// import ReadyTune from "../../components/podcast/ReadyTune";
import HaveTopic from "../../components/podcast/HaveTopic";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

export default function Podcast() {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Podcast" }}
        containerProps={{ pt: "16px" }}
      />
      <WelcomePodcast />
      <FreeGateway />
      <AvaliableApp />
      <InsideLookProviders />
      <WhyTuneIn />
      {/* <ReadyTune /> */}
      <HaveTopic />
    </Layout>
  );
}
