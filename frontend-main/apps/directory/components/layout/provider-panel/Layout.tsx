import React from "react";
import Sidebar from "@repo/ui/components/Sidebar";
import { providerPanelMenu } from "@repo/ui/constants/constant";
import { Flex } from "@chakra-ui/react";
import Topbar from "./Topbar";

const Layout = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) => {
  return (
    <Flex bg={"secondary.50.light"} padding={"16px"} gap={"32px"} h={"100vh"}>
      <Sidebar menu={providerPanelMenu as any} />
      <Flex width={"100%"} flexDir={"column"}>
        <Topbar header={header} />
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
