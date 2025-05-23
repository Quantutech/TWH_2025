import Layout from "../../components/layout/Layout";
import HowCanWeHelpYou from "../../components/faq/HowCanWeHelpYou";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

export default function Faq() {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "FAQ" }}
        containerProps={{ pt: "16px" }}
      />
      <HowCanWeHelpYou />
    </Layout>
  );
}
