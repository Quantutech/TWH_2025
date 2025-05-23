"use client";
import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";

interface IntroductionTabProps {
  data: ResponseData<ProviderGetMeResponseData> | undefined;
}

const IntroductionTab = ({ data }: IntroductionTabProps) => {
  const bio = data?.data?.bio || "No Data Found";

  return (
    <VStack
      id="introduction"
      w="100%"
      borderRadius="16px"
      border="1px solid"
      borderColor={"secondary.100.light"}
      padding={{ base: "16px", lg: "24px" }}
      gap="12px"
      alignItems="flex-start"
      bg="base.white.light"
      mb={{ base: "16px", lg: "24px" }}
    >
      <Text fontWeight="600" fontSize="20px" color={"secondary.950.light"}>
        Introduction
      </Text>
      <Text
        fontWeight="400"
        fontSize="16px"
        color="secondary.600.light"
        whiteSpace={"pre-wrap"}
      >
        {bio}
      </Text>
    </VStack>
  );
};

export default IntroductionTab;
