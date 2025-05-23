import { Flex, Text, VStack, Image, Box } from "@chakra-ui/react";
import React from "react";
import map from "@repo/ui/assets/about/Map-wrap.webp";
const Worldwide = () => {
  return (
    <Box w={"100%"} bg={"base.white.light"}>
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
        gap={{ base: "32px", md: "40px", lg: "48px" }}
      >
        <VStack gap={"8px"} maxW={"780px"} textAlign={"center"}>
          <Text
            fontWeight={"600"}
            fontSize={{ base: "24px", md: "36px" }}
            color={"secondary.950.light"}
          >
            Connect With Providers Across the States
          </Text>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "16px", md: "20px" }}
            color={"secondary.600.light"}
          >
            Access and network with therapists, coaches and mental health
            professionals across the US.
          </Text>
        </VStack>
        <Flex justifyContent="center" alignItems="center">
          <Image
            src={map.src}
            width={{ base: "100%", lg: "100%", xl: "880px" }}
          />
        </Flex>
      </VStack>
    </Box>
  );
};

export default Worldwide;
