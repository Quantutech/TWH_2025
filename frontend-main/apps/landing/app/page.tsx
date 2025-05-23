import Layout from "../components/layout/Layout";
import TopSearchedSpecialtiesSlider from "../components/home/TopSearchedSpecialtiesSlider";
import WhyChooseTeleWellnessHub from "../components/home/WhyChooseTeleWellnessHub";
import TelewellnessHub from "../components/home/TelewellnessHub";
import Insurance from "../components/home/Insurance";
import HowItWorks from "../components/home/HowItWorks";
import Podcast from "../components/home/Podcasts";
import TrustedExperts from "../components/home/TrustedExperts";
// import LatestArticle from "../components/home/LatestArticle";
import TopRankedProviders from "../components/home/TopRankedProviders";

export default function Home() {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <TelewellnessHub />
      <WhyChooseTeleWellnessHub />
      <TopSearchedSpecialtiesSlider />
      <TopRankedProviders />
      <HowItWorks />
      <Podcast />
      <TrustedExperts />
      {/* <LatestArticle /> */}
      <Insurance />
    </Layout>
  );
}
