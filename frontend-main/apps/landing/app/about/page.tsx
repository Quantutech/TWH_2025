import React from "react";
import Layout from "../../components/layout/Layout";
import MentalWellness from "../../components/about/MentalWellness";
import OurMission from "../../components/about/OurMission";
import Worldwide from "../../components/about/Worldwide";
import MoreAbout from "../../components/about/MoreAbout";
import TeamMember from "../../components/about/TeamMember";
import InformationBoxes from "../../components/about/InformationBoxes";
import ValuesStatement from "../../components/about/ValuesStatement";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

const About = () => {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "About us" }}
        containerProps={{ pt: "16px" }}
      />
      <MentalWellness />
      <OurMission />
      <InformationBoxes />
      <Worldwide />
      <MoreAbout />
      <ValuesStatement />
      <TeamMember />
    </Layout>
  );
};

export default About;
