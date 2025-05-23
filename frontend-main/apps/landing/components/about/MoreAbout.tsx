import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

const MoreAbout = () => {
  return (
    <VStack w={"100%"}>
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
          fontWeight={"600"}
          fontSize={{ base: "24px", md: "30px" }}
          color={"secondary.950.light"}
          minW={"180px"}
          maxW={{ base: "340px", lg: "180px" }}
        >
          More About Our Mission
        </Text>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "18px", md: "20px" }}
          color={"secondary.600.light"}
          maxW={"850px"}
        >
          We are dedicated to reimagining access to mental health and wellness
          by connecting individuals with trusted providers who are visionaries
          in their field, empowering people to take charge of their well-being.
          Our purpose is to bridge the gap between mental and physical health,
          ensuring that high-quality, accessible resources are always within
          reach—free and welcoming to all. We aim to change the way we perceive
          “getting help,” transforming it from an overwhelming burden into an
          engaging, positive, and empowering experience.
        </Text>
      </HStack>
    </VStack>
  );
};

export default MoreAbout;
