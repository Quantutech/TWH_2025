"use client";
import React from "react";
import { Text, Box, Image, VStack, HStack, Button } from "@chakra-ui/react";
import podcastLeft from "@repo/ui/assets/podcast/podcast-left.webp";
import podcastRight from "@repo/ui/assets/podcast/podcast-right.webp";

const DiscoverHowYouCanMakeADifference = () => {
  const handleScrollToForm = () => {
    const element = document.getElementById("partner-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box w={"100%"} bg={"base.white.light"}>
      <VStack
        maxW={"1440px"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        margin={"auto"}
        gap={"64px"}
        bg={"base.white.light"}
      >
        {/* 1 */}
        <HStack
          justifyContent={"space-between"}
          w={"100%"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Image
            src={podcastLeft.src}
            alt="podcast"
            order={{ base: 2, md: 1 }}
            maxW={{ base: "100%", md: "450px", lg: "500px", xl: "644px" }}
          />
          <Box order={{ base: 1, md: 2 }}>
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "30px" }}
              mb="20px"
            >
              For Vendors & Service Providers
            </Text>
            <VStack align="start" spacing="20px" my={"16px"}>
              <Box>
                <Text fontWeight="600" fontSize={{ base: "18px", lg: "20px" }}>
                  Showcase Your Solutions
                </Text>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="secondary.600.light"
                >
                  Feature your innovative tools, platforms, or services to our
                  providers and on our platform.
                </Text>
              </Box>
            </VStack>
            <Button
              h={{ base: "40px", md: "48px" }}
              justifyContent={"center"}
              padding={"12px"}
              alignItems={"center"}
              border={"1px solid"}
              borderColor={"primary.500.light"}
              borderRadius={"8px"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"base.white.light"}
              bg={"primary.500.light"}
              _hover={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              _active={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              onClick={handleScrollToForm}
            >
              Partner with Us
            </Button>
          </Box>
        </HStack>

        {/* 2 */}
        <HStack
          justifyContent={"space-between"}
          w={"100%"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box order={{ base: 2, md: 1 }}>
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "30px" }}
              mb="20px"
            >
              For Sponsors & Strategic Allies
            </Text>
            <VStack align="start" spacing="20px" my={"16px"}>
              <Box>
                <Text fontWeight="600" fontSize={{ base: "18px", lg: "20px" }}>
                  Amplify Your Brand
                </Text>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="secondary.600.light"
                >
                  Support our mission while gaining high-impact exposure across
                  our network—from digital ad placements to featured profiles on
                  provider pages.
                </Text>
              </Box>
            </VStack>
            <Button
              h={{ base: "40px", md: "48px" }}
              justifyContent={"center"}
              padding={"12px"}
              alignItems={"center"}
              border={"1px solid"}
              borderColor={"primary.500.light"}
              borderRadius={"8px"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"base.white.light"}
              bg={"primary.500.light"}
              _hover={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              _active={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              onClick={handleScrollToForm}
            >
              Partner with Us
            </Button>
          </Box>
          <Image
            src={podcastRight.src}
            alt="podcast"
            order={{ base: 2, md: 1 }}
            maxW={{ base: "100%", md: "450px", lg: "500px", xl: "644px" }}
          />
        </HStack>

        {/* 3 */}
        <HStack
          justifyContent={"space-between"}
          w={"100%"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Image
            src={podcastLeft.src}
            alt="podcast"
            order={{ base: 2, md: 1 }}
            maxW={{ base: "100%", md: "450px", lg: "500px", xl: "644px" }}
          />
          <Box order={{ base: 1, md: 2 }}>
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "30px" }}
              mb="20px"
            >
              For Collaborative Innovators
            </Text>
            <VStack align="start" spacing="20px" my={"16px"}>
              <Box>
                <Text fontWeight="600" fontSize={{ base: "18px", lg: "20px" }}>
                  Co-Develop Impactful Programs
                </Text>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="secondary.600.light"
                >
                  Join forces with TeleWellness Hub to design, pilot, and scale
                  new initiatives that solve real challenges for wellness
                  providers.
                </Text>
              </Box>
            </VStack>
            <Button
              h={{ base: "40px", md: "48px" }}
              justifyContent={"center"}
              padding={"12px"}
              alignItems={"center"}
              border={"1px solid"}
              borderColor={"primary.500.light"}
              borderRadius={"8px"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"base.white.light"}
              bg={"primary.500.light"}
              _hover={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              _active={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              onClick={handleScrollToForm}
            >
              Partner with Us
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default DiscoverHowYouCanMakeADifference;
