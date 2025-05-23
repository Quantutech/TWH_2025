import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

const HaveTopic = () => {
  return (
    <VStack
      maxW={"1440px"}
      margin={"auto"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"base.white.light"}
    >
      <VStack gap={"16px"}>
        <Text
          fontWeight={"600"}
          fontSize={{ base: "24px", lg: "30px" }}
          textAlign={"center"}
        >
          Have a topic or provider to recommend or want to be featured?
        </Text>
        <HStack flexDir={{ base: "column", md: "row" }}>
          <Text
            fontWeight={"400"}
            fontSize={"20px"}
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
          >
            Contact us at
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={{ base: "20px", lg: "24px" }}
            decoration={"underline"}
            color={"primary.600.light"}
            whiteSpace={"nowrap"}
          >
            Podcast@telewellnesshub.com
          </Text>
        </HStack>
      </VStack>
      <VStack gap={"16px"}>
        <Text
          fontWeight={"600"}
          fontSize={{ base: "24px", lg: "30px" }}
          textAlign={"center"}
        >
          Interested in becoming a podcast sponsor?
        </Text>
        <HStack flexDir={{ base: "column", md: "row" }}>
          <Text
            fontWeight={"400"}
            fontSize={"20px"}
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
          >
            Contact us at
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={{ base: "20px", lg: "24px" }}
            decoration={"underline"}
            color={"primary.600.light"}
            whiteSpace={"nowrap"}
          >
            Podcast@telewellnesshub.com
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default HaveTopic;
