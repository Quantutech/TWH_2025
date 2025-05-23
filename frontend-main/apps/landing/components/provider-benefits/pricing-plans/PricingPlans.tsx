"use client";
import React, { useState } from "react";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import PlanBox from "./PlanBox";

const PricingPlans = () => {
  const [selectBilling, setSelectBilling] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <Flex width={"100%"} flexDirection={"column"}>
      <Box id="pay-what-you-can" width={"100%"} bg={"primary.500.light"}>
        <Box
          padding={{
            base: "32px 16px 256px 16px",
            sm: "32px 16px 256px 16px",
            md: "32px 16px 256px 16px",
            lg: "32px 16px 256px 16px",
            xl: "64px 16px 256px 16px",
            "2xl": "64px 0px 256px 0px",
          }}
          maxW={"1440px"}
          margin={"auto"}
        >
          <VStack>
            <VStack gap={{ base: "16px", md: "32px" }}>
              <Text
                fontWeight={"600"}
                fontSize={"16px"}
                color={"secondary.200.light"}
              >
                Pricing
              </Text>
              <Text
                fontWeight={"700"}
                fontSize={{ base: "36px", lg: "48px" }}
                color={"base.white.light"}
              >
                Pricing Plans
              </Text>
              <Text
                fontWeight={"500"}
                fontSize={{ base: "16px", lg: "20px" }}
                color={"secondary.50.light"}
              >
                Choose Your Directory Profile Membership
              </Text>
              <HStack>
                <Button
                  onClick={() => setSelectBilling("monthly")}
                  bg={
                    selectBilling === "monthly"
                      ? "base.white.light"
                      : "transparent"
                  }
                  color={"primary.600.light"}
                  fontSize={"16px"}
                  textColor={
                    selectBilling === "monthly"
                      ? "primary.600.light"
                      : "base.white.light"
                  }
                  opacity={1}
                  transitionDuration={"300ms"}
                  _hover={{
                    bg:
                      selectBilling === "monthly"
                        ? "base.white.light"
                        : "transparent",
                    opacity: 0.7,
                  }}
                  _active={{
                    bg:
                      selectBilling === "monthly"
                        ? "base.white.light"
                        : "transparent",
                    opacity: 0.7,
                  }}
                >
                  Monthly Billing
                </Button>
                <Button
                  onClick={() => setSelectBilling("annual")}
                  bg={
                    selectBilling === "annual"
                      ? "base.white.light"
                      : "transparent"
                  }
                  color={"primary.600.light"}
                  fontSize={"16px"}
                  textColor={
                    selectBilling === "annual"
                      ? "primary.600.light"
                      : "base.white.light"
                  }
                  opacity={1}
                  transitionDuration={"300ms"}
                  _hover={{
                    bg:
                      selectBilling === "annual"
                        ? "base.white.light"
                        : "transparent",
                    opacity: 0.7,
                  }}
                  _active={{
                    bg:
                      selectBilling === "annual"
                        ? "base.white.light"
                        : "transparent",
                    opacity: 0.7,
                  }}
                >
                  Annual Billing
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Box>
      <PlanBox selectBilling={selectBilling} />
    </Flex>
  );
};

export default PricingPlans;
