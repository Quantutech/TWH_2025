import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

const JoinPlatform = () => {
  return (
    <Box
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
      <HStack
        maxW={"1440px"}
        mx={"auto"}
        borderRadius="24px"
        padding={{ base: "32px", lg: "64px" }}
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
            Ready to Be Part of Something Big?
          </Text>
          <Text
            fontSize={"18px"}
            fontWeight="400"
            color="base.white.light"
            maxW={{ base: "100%", md: "720px" }}
          >
            This is your chance to build the practice you want—on your terms.
            Reach more people, increase your income, and make a lasting impact.
            Join a platform that’s truly here for you.
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
            _hover={{ bg: "primary.500.light", color: "base.white.light" }}
            _active={{ bg: "primary.500.light", color: "base.white.light" }}
          >
            Get Started Today
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default JoinPlatform;
