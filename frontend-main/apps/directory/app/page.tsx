import { Flex } from "@chakra-ui/react";
import Filters from "../components/Filters";
import Layout from "../components/layout/Layout";
import SortBy from "../components/SortBy";
import ProviderCarts from "../components/ProviderCarts";
import type { Metadata } from "next";
import ProviderSearchSide from "../components/ProviderSearchSide";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

export const metadata: Metadata = {
  title: "Home - TeleWellness Hub",
};

export default function Home() {
  return (
    <Layout>
      <BreadCrumb
        secondLink={{ label: "List of Providers" }}
        containerProps={{ pt: "16px" }}
      />
      <Flex
        flexDirection={"column"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <ProviderSearchSide />
        <Flex gap={"16px"}>
          <Filters />
          <Flex width={"100%"} flexDirection={"column"} gap={"16px"}>
            <SortBy />
            <ProviderCarts />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
