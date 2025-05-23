"use client";
import React from "react";
import { Text, Flex, Image, HStack, VStack, Button } from "@chakra-ui/react";
import podcast from "@repo/ui/assets/podcast.webp";
import { useRouter } from "next/navigation";

const Podcasts = () => {
  const router = useRouter();
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        bg={"secondary.50.light"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        maxW="1440px"
        margin={"auto"}
      >
        <VStack alignItems="flex-start" gap="24px" justifyContent={"center"}>
          <Text fontSize={{ base: "24px", md: "30px" }} fontWeight={"700"}>
            Podcasts & YouTube
          </Text>
          <HStack alignItems="center">
            <VStack align="flex-start">
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="400"
                color={"secondary.600.light"}
              >
                Listen to expert interviews and insightful discussions on mental
                health, personal growth, and wellness. Whether you prefer
                podcasts or videos, each episode provides practical tools and
                strategies to enhance your well-being.
              </Text>
            </VStack>
          </HStack>
          <HStack gap={"16px"} flexWrap={"wrap"}>
            <Button
              h={"48px"}
              w={"216px"}
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
                bg: "primary.500.light",
                color: "primary.500.light",
              }}
              onClick={() => {
                router.push("https://www.buzzsprout.com/2134720");
              }}
            >
              Listen Now
            </Button>
            <Button
              h={"48px"}
              w={"216px"}
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
                bg: "primary.500.light",
                color: "primary.500.light",
              }}
              onClick={() => {
                router.push(
                  "https://www.youtube.com/channel/UCbU2J7FvLiY57dxlOx7Cmlg"
                );
              }}
            >
              Watch on YouTube
            </Button>
          </HStack>
        </VStack>
        <Flex justifyContent="center" alignItems="center">
          <Image
            src={podcast.src}
            width={{ base: "auto", lg: "500px", xl: "656px" }}
            minW={{ base: "auto", lg: "500px", xl: "656px" }}
            height={"auto"}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Podcasts;
