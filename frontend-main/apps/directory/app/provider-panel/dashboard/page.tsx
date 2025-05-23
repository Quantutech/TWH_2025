import Layout from "../../../components/layout/provider-panel/Layout";
import Content from "../../../components/pages/dashboard/Content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Dashboard">
      <Content />
    </Layout>
  );
};

export default page;
