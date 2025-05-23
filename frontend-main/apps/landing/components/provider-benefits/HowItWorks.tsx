"use client";
import React from "react";
import { Box, Text, Flex, Image, HStack, VStack } from "@chakra-ui/react";
import benefitsBody from "@repo/ui/assets/provider-benefits/benefitsBody.webp";
import RoundedCheckIcon from "@repo/ui/components/icons/RoundedCheckIcon";
import { colors } from "@repo/ui/theme";

const HowItWorks = () => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      maxWidth={"1440px"}
      justifyContent={"space-between"}
      margin={"auto"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <Image
        src={benefitsBody.src}
        display={{ base: "none", lg: "block" }}
        width={{ base: undefined, lg: "500px", xl: "600px", "2xl": "656px" }}
      />
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="24px"
        justifyContent={"center"}
      >
        <Text
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"700"}
          color={"secondary.950.light"}
        >
          Built by Someone Who’s Been There
        </Text>

        <HStack alignItems="flex-start" gap={{ base: "12px", md: "16px" }}>
          <RoundedCheckIcon
            svg={{
              width: "22px",
              height: "22px",
              style: { minWidth: "22px", minHeight: "22px" },
            }}
            path={{ fill: colors?.secondary?.["500"]?.light }}
          />
          <VStack alignItems="flex-start">
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="400"
              color={"secondary.800.light"}
              padding={0}
            >
              <b>Created by a provider, for providers </b>Built by a licensed
              mental health professional who understands the overwhelm,
              competition, and challenges of growing a presence online.
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="flex-start" gap={{ base: "12px", md: "16px" }}>
          <RoundedCheckIcon
            svg={{
              width: "22px",
              height: "22px",
              style: { minWidth: "22px", minHeight: "22px" },
            }}
          />
          <VStack alignItems="flex-start">
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="400"
              color={"secondary.800.light"}
              padding={0}
            >
              <b>Showcase your full range</b> Highlight all your credentials
              across states and disciplines and service offerings—therapy,
              coaching, consulting, and more.
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="flex-start" gap={{ base: "12px", md: "16px" }}>
          <RoundedCheckIcon
            svg={{
              width: "22px",
              height: "22px",
              style: { minWidth: "22px", minHeight: "22px" },
            }}
          />
          <VStack alignItems="flex-start">
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              color={"secondary.800.light"}
              fontWeight="400"
              padding={0}
            >
              <b>Grow on your terms </b> Enjoy the freedom to build a practice
              that reflects you, with a platform designed to help you stand out
              and succeed.
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Image
        src={benefitsBody.src}
        display={{ base: "block", lg: "none" }}
        width={{ base: "auto", lg: "656px" }}
        height={"auto"}
      />
    </Flex>
  );
};

export default HowItWorks;
