"use client";
import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { chooseBox } from "@repo/ui/constants/constant";
import { colors } from "@repo/ui/theme";

const WhyChooseTeleWellnessHub = () => {
  return (
    <Box
      w="100%"
      justifyContent="center"
      flexDirection="column"
      mt={{ base: "800px", md: "650px", lg: "680px", xl: "650px" }}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <Text
        textAlign="center"
        fontWeight="700"
        marginBottom="24px"
        fontSize={{ base: "24px", md: "30px" }}
        userSelect={"none"}
      >
        Why Choose TeleWellness Hub?
      </Text>
      <Flex
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
        maxW={"1440px"}
        m={"auto"}
      >
        {chooseBox.map(({ header, icon: Icon, text }, index) => (
          <Flex
            key={index}
            w={{
              sm: "452px",
              md: "756px",
              lg: "424px",
              xl: "408px",
              "2xl": "421px",
            }}
            h="227px"
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            textAlign="center"
            gap="16px"
            padding={"24px 22px 32px 22px"}
            borderRadius="16px"
            border="1px solid"
            borderColor={"secondary.100.light"}
            bgColor="base.white.light"
            userSelect={"none"}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              padding={"16px"}
              borderRadius="32px"
              bg="primary.100.light"
            >
              <Icon path={{ fill: colors?.secondary?.["500"]?.light }} />
            </Box>
            <Flex flexDirection={"column"} gap={"8px"}>
              <Text fontSize="18px" fontWeight="600">
                {header}
              </Text>
              <Text
                fontSize="14px"
                fontWeight="400"
                color={"secondary.600.light"}
                lineHeight={"24px"}
              >
                {text}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default WhyChooseTeleWellnessHub;
