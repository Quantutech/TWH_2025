"use client";
import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { howItWorks } from "@repo/ui/constants/constant";
import howworks from "@repo/ui/assets/howitworks/howworks.webp";
import { useRouter } from "next/navigation";
import { colors } from "@repo/ui/theme";

const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;

const HowItWorks = () => {
  const router = useRouter();
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"12px"}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        bg={"secondary.50.light"}
        maxWidth={"1440px"}
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
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          order={{ base: 2, md: 2, lg: -1 }}
        >
          <Image
            src={howworks.src}
            width={{ base: "auto", lg: "656px" }}
            height={"auto"}
          />
        </Box>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="24px"
          justifyContent={"center"}
        >
          <Text fontSize={{ base: "24px", md: "30px" }} fontWeight={"700"}>
            How TeleWellness Hub Works
          </Text>
          {howItWorks.map(({ header, icon: Icon, text }, index) => (
            <HStack
              key={index}
              alignItems="center"
              gap={{ base: "12px", md: "16px" }}
            >
              <Box
                padding={{ base: "12px", md: "16px" }}
                borderRadius="32px"
                bg={"secondary.100.light"}
              >
                <Icon path={{ fill: colors?.secondary?.["500"]?.light }} />
              </Box>
              <VStack align="flex-start">
                <Text fontSize={{ base: "18px", md: "20px" }} fontWeight="600">
                  {header}
                </Text>
                <Text
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight="400"
                  color={"secondary.600.light"}
                >
                  {text}
                </Text>
              </VStack>
            </HStack>
          ))}
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
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            onClick={() => {
              router.push(`${directoryUrl}`);
            }}
          >
            Find Your Provider
          </Button>
        </Box>
      </Flex>
      <HStack
        maxW={"1440px"}
        width={"100%"}
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
          width={"100%"}
          bg="primary.500.light"
          borderRadius="24px"
          gap={{ base: "16px", md: "32px" }}
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "column", lg: "row" }}
          textAlign={{ base: "center", md: "left" }}
          padding={{ base: "20px ", md: "32px", lg: "40px", xl: "64px" }}
        >
          <Flex flexDirection={"column"}>
            <Text
              fontSize={{ base: "24px", sm: "28px", md: "30px" }}
              fontWeight="700"
              color="base.white.light"
              mb={{ base: "8px", md: "16px" }}
            >
              Empower Your Practice with a Platform Built for You
            </Text>
            <Text
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              fontWeight="400"
              color="base.white.light"
              maxW={{ base: "100%", md: "700px" }}
            >
              TeleWellness Hub was created by a provider, for providers, and
              your voice shapes our growth. Every decision we make is informed
              by providers like you. We're here to showcase your expertise and
              help you focus on what matters most-delivering exceptional care.
            </Text>
          </Flex>
          <Box>
            <Button
              h="48px"
              w={{ base: "100%", md: "216px" }}
              border="1px solid"
              borderColor={"base.white.light"}
              borderRadius="8px"
              fontWeight="600"
              fontSize="16px"
              color="primary.500.light"
              bg="base.white.light"
              _hover={{
                bg: "primary.500.light",
                color: "base.white.light",
              }}
              _active={{
                bg: "primary.500.light",
                color: "base.white.light",
              }}
              onClick={() => {
                router.push(`${directoryUrl}/provider-sign-up`);
              }}
            >
              Join as a Provider
            </Button>
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default HowItWorks;
