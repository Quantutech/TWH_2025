"use client";
import React from "react";
import { Text, Box, HStack } from "@chakra-ui/react";

const FreeGateway = () => {
  return (
    <Box w={"100%"} bg={"base.white.light"}>
      <HStack
        flexDirection={{ base: "column", md: "row" }}
        maxW={"1440px"}
        margin={"auto"}
        alignItems={"flex-start"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        gap={{ base: "8px", lg: "32px" }}
      >
        <Box minW={{ base: "100%", md: "300px" }}>
          <Text
            fontSize={{ base: "24px", lg: "30px" }}
            fontWeight={"600"}
            color={"secondary.950.light"}
          >
            Your Free Gateway to Wellness Insight
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "20px" }}
            fontWeight={"400"}
            textColor={"secondary.600.light"}
            lineHeight={"30px"}
          >
            Discover a treasure trove of mental health and wellness expertise at
            your fingertips! The TeleWellness Hub Podcast is a completely free
            resource, designed to connect you with mental health and wellness
            providers across the country. Whether you’re looking for guidance,
            inspiration, or a deeper understanding of available wellness
            options, we’ve got you covered.
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default FreeGateway;
