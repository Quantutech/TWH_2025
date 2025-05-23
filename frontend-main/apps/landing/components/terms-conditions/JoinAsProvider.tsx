import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import React from "react";

const JoinAsProvider = () => {
  return (
    <Box
      width={"100%"}
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
    >
      <HStack
        padding={{ base: "32px", md: "64px" }}
        borderRadius="24px"
        bg="primary.500.light"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Flex flexDirection={"column"}>
          <Text
            fontSize={{ base: "22px", sm: "24px", md: "30px" }}
            fontWeight="700"
            color="base.white.light"
            mb={{ base: "8px", md: "16px" }}
            whiteSpace={"nowrap"}
          >
            Join 2,000+ subscribers
          </Text>
          <Text
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            fontWeight="400"
            color="base.white.light"
            maxW={{ base: "100%", md: "700px" }}
          >
            Stay in the loop with everything you need to know.
          </Text>
        </Flex>
        <HStack>
          <Input
            type="email"
            placeholder="Enter your email"
            bg={"base.white.light"}
            fontSize={{ base: "14px", md: "16px" }}
            padding={{ base: "0px 12px", md: "0px 16px" }}
            h={{ base: "40px", md: "48px" }}
            w={{ base: "100%", md: "324px", lg: "300px", xl: "342px" }}
            color={"secondary.400.light"}
            _placeholder={{
              color: "secondary.400.light",
              fontsize: { base: "14px", md: "16px" },
            }}
          />
          <Button
            h={{ base: "40px", md: "48px" }}
            borderRadius="8px"
            fontWeight="600"
            fontSize={{ base: "14px", md: "16px" }}
            color="base.white.light"
            border={"1px solid"}
            borderColor={"primary.700.light"}
            bg="primary.700.light"
            _hover={{ bg: "transparent", color: "base.white.light" }}
          >
            Subscribe
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default JoinAsProvider;
