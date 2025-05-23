"use client";
import React from "react";
import {
  Text,
  Flex,
  Box,
  HStack,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import howworks from "@repo/ui/assets/for-partners/right.webp";
import { howItWorksForPartners } from "@repo/ui/constants/constant";

const HowItWorks = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"12px"}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        maxWidth={"1440px"}
        width={"100%"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        margin={"auto"}
      >
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          gap="24px"
          justifyContent={"center"}
          maxW={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "480px",
            xl: "550px",
            "2xl": "650px",
          }}
        >
          <Flex flexDir={"column"} gap={"8px"}>
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              color={"secondary.600.light"}
              fontWeight={"500"}
            >
              How It Works
            </Text>
            <Text
              fontSize={{ base: "24px", md: "28px", xl: "30px" }}
              fontWeight={"700"}
            >
              A Seamless Partnership Journey
            </Text>
          </Flex>
          {howItWorksForPartners.map(({ header, icon: Icon, text }, index) => (
            <HStack
              key={index}
              alignItems="center"
              gap={{ base: "12px", md: "16px" }}
            >
              <Box
                width={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                minWidth={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                maxWidth={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                height={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                minHeight={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                maxHeight={{ base: "50px", md: "56px", lg: "60px", xl: "64px" }}
                padding={{ base: "12px", md: "16px" }}
                borderRadius="50%"
                bg={"secondary.100.light"}
              >
                <Icon svg={{ width: "100%", height: "100%" }} />
              </Box>
              <VStack align="flex-start">
                <Text
                  fontSize={{
                    base: "18px",
                    xl: "20px",
                  }}
                  fontWeight="600"
                >
                  {header}
                </Text>
                <Text
                  fontSize={{ base: "16px", xl: "18px" }}
                  fontWeight="400"
                  color={"secondary.600.light"}
                >
                  {text}
                </Text>
              </VStack>
            </HStack>
          ))}
          <Button
            h={{ base: "40px", md: "48px" }}
            w={{ base: "284px", md: "320px" }}
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
            _hover={{ bg: "transparent", color: "primary.500.light" }}
            _active={{ bg: "transparent", color: "primary.500.light" }}
          >
            Contact Our Partnership Team
          </Button>
        </Flex>
        <Flex
          width={"100%"}
          justifyContent={{ base: "center", md: "flex-end" }}
          alignItems="center"
        >
          <Image
            src={howworks.src}
            width={{ base: "auto", lg: "656px" }}
            height={"auto"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HowItWorks;
