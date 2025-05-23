"use client";
import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";

const OurMission = () => {
  return (
    <VStack w={"100%"} bg={"base.white.light"}>
      <HStack
        maxW={"1440px"}
        width={"100%"}
        margin={"auto"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        alignItems={"flex-start"}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: "16px", md: "12px" }}
      >
        <Text
          w={"30%"}
          fontWeight={"600"}
          fontSize={{ base: "24px", md: "30px" }}
          color={"secondary.950.light"}
          whiteSpace={"nowrap"}
        >
          Our Mission
        </Text>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "18px", md: "20px" }}
          color={"secondary.600.light"}
          maxW={"850px"}
        >
          Redefine mental health and wellness with a comprehensive,
          life-changing solution for everyone, offering free access to
          multichannel wellness options—from services to products— connecting
          individuals to trusted providers and empowering them to take control
          of their well-being, and helping providers grow, earn passive income,
          and make an impact.
        </Text>
      </HStack>
    </VStack>
  );
};

export default OurMission;
