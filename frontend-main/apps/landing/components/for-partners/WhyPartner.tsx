"use client";
import React from "react";
import { Text, Flex, Box, HStack } from "@chakra-ui/react";

const WhyPartner = () => {
  return (
    <Box w={"100%"} bg={"base.white.light"}>
      <HStack
        flexDirection={{ base: "column", md: "row" }}
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
        alignItems={"flex-start"}
        gap={{ base: "8px", lg: "32px" }}
      >
        <Text
          minW={{ base: "100%", md: "300px" }}
          fontSize={{ base: "24px", lg: "30px" }}
          fontWeight={"600"}
        >
          Why Partner with TeleWellness Hub?
        </Text>
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "20px" }}
            fontWeight={"400"}
            textColor={"secondary.600.light"}
            lineHeight={"30px"}
          >
            At TeleWellness Hub, we believe that great partnerships create
            lasting impact. By collaborating with external partners like you,
            we’re building a comprehensive ecosystem that supports our
            providers—and in turn, the clients they serve. When you partner with
            us, you’re not just promoting your service; you’re playing a vital
            role in enhancing mental health and wellness nationwide.
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default WhyPartner;
