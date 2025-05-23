"use client";
import React from "react";
import { Text, Flex, Box, HStack, Button } from "@chakra-ui/react";
import {} from "@repo/ui/constants/constant";

const ReadyToTransformBox = () => {
  return (
    <Box
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      bg={"base.white.light"}
      w={"100%"}
    >
      <HStack
        maxW={"1440px"}
        mx={"auto"}
        padding={{ base: "20px ", md: "32px", lg: "40px", xl: "64px" }}
        borderRadius="24px"
        bg="primary.500.light"
        spacing={{ base: "16px", md: "32px" }}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Flex flexDirection={"column"}>
          <Text
            fontSize={{ base: "24px", sm: "28px", md: "30px" }}
            fontWeight="700"
            color="base.white.light"
            mb={{ base: "8px", md: "16px" }}
          >
            Ready to Transform the Wellness Landscape?
          </Text>
          <Text
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            fontWeight="400"
            color="base.white.light"
            maxW={{ base: "100%", md: "700px" }}
          >
            Join a movement where your innovative solutions empower providers to
            thrive and, in turn, help thousands of clients access the support
            they need. Let’s work together to build a healthier, more connected
            future.
          </Text>
        </Flex>
        <Box>
          <Button
            h={{ base: "40px", md: "48px" }}
            w={{ base: "100%", md: "240px" }}
            border="1px solid"
            borderColor={"base.white.light"}
            borderRadius="8px"
            fontWeight="600"
            fontSize={{ base: "14px", md: "16px" }}
            color="primary.500.light"
            bg="base.white.light"
            _hover={{ bg: "transparent", color: "base.white.light" }}
            _active={{ bg: "transparent", color: "base.white.light" }}
          >
            Become a Partner Today
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default ReadyToTransformBox;
