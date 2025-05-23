"use client";
import React from "react";
import { Text, Flex, Image, VStack } from "@chakra-ui/react";
import about from "@repo/ui/assets/about/about.webp";

const MentalWellness = () => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="space-between"
      bg="secondary.50.light"
      margin="auto"
      maxW={"1440px"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <Flex
        flexDirection="column"
        alignItems={{ base: "flex-start", lg: "flex-start" }}
        textAlign={{ base: "left", lg: "left" }}
        gap="12px"
        w={{ base: "100%", lg: "561px" }}
      >
        <Text
          fontSize={{ base: "24px", lg: "16px" }}
          display={{ base: "none", lg: "block" }}
          fontWeight="600"
          color={"primary.600.light"}
        >
          About us
        </Text>
        <VStack align={{ base: "flex-start", lg: "flex-start" }} spacing="12px">
          <Text fontSize={{ base: "24px", md: "36px" }} fontWeight="700">
            Mental Health and Wellness Made Easy
          </Text>
          <Text
            fontSize={{ base: "16px", lg: "20px" }}
            fontWeight="400"
            color="secondary.600.light"
            lineHeight="30px"
          >
            Your trusted companion on the journey to mental peace and
            well-being.
          </Text>
        </VStack>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        w={{ base: "100%", lg: "50%" }}
      >
        <Image
          src={about.src}
          width={{ base: "100%", lg: "500px", xl: "656px" }}
          height="auto"
          maxW="656px"
        />
      </Flex>
    </Flex>
  );
};

export default MentalWellness;
