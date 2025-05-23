import BreadCrumb from "@repo/ui/components/BreadCrumb";
import GetInTouch from "../../components/contact-us/GetInTouch";
import Layout from "../../components/layout/Layout";

export default function ContactUs() {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Contact us" }}
        containerProps={{ pt: "16px" }}
      />
      <GetInTouch />
    </Layout>
  );
}
