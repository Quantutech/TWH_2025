"use client";
import React, { Dispatch, SetStateAction } from "react";
import { HStack, Link, Text } from "@chakra-ui/react";
import { ProviderDetailActiveTab } from "@repo/ui/utils/type";

interface Props {
  activeTab: ProviderDetailActiveTab;
  setActiveTab: Dispatch<SetStateAction<ProviderDetailActiveTab>>;
}

const Tab = ({ activeTab, setActiveTab }: Props) => {
  const tabs: {
    label: string;
    width: string;
    id: ProviderDetailActiveTab;
  }[] = [
    { label: "Introduction", width: "125px", id: "introduction" },
    { label: "Location", width: "94px", id: "location" },
    { label: "Services", width: "93px", id: "services" },
    { label: "About", width: "74px", id: "about" },
    // { label: "Reviews", width: "91px", id: "reviews" },
    { label: "Media", width: "75px", id: "media" },
    { label: "Resources", width: "109px", id: "resources" },
  ];
  return (
    <HStack
      width={"100%"}
      padding={{ base: "8px 24px", lg: "24px" }}
      gap={{ base: "8px", md: "12px" }}
      overflowX={"auto"}
      sx={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={`#${tab.id}`}
          borderBottom={activeTab === tab.id ? "2px solid" : "1px solid"}
          borderColor={activeTab === tab.id ? "primary.500.light" : "secondary.100.light"}
          cursor="pointer"
          pb={"8px"}
          textDecoration={"none !important"}
          onClick={() => {
            setActiveTab(tab.id);
          }}
        >
          <Text fontWeight="600" fontSize={{ base: "14px", md: "16px" }} color="primary.500.light">
            {tab.label}
          </Text>
        </Link>
      ))}
    </HStack>
  );
};

export default Tab;
