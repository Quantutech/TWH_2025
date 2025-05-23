import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  activeStep: number | undefined;
}

const StatusTab = ({ activeStep }: Props) => {
  if (
    activeStep === 1 ||
    activeStep === 2 ||
    activeStep === 3 ||
    activeStep === 4
  ) {
    return (
      <Flex
        bg={"base.white.light"}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        overflow={"hidden"}
        mt={"24px"}
        p={"44px 80px 50px 80px"}
      >
        {/* personal information */}
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"24px"}
          height={"24px"}
          minW={"24px"}
          minH={"24px"}
          borderRadius={"50%"}
          bg={activeStep >= 1 ? "primary.600.light" : "base.white.light"}
          border={"2px solid"}
          borderColor={"secondary.100.light"}
          position={"relative"}
        >
          {activeStep >= 2 ? (
            <CheckIcon
              width={"12px"}
              height={"12px"}
              color={"base.white.light"}
            />
          ) : (
            <Box
              width={"8px"}
              height={"8px"}
              borderRadius={"50%"}
              bg={"secondary.200.light"}
            />
          )}
          <Text
            pos={"absolute"}
            bottom={"-24px"}
            left="50%"
            transform="translateX(-50%)"
            whiteSpace={"nowrap"}
            fontWeight={600}
            fontSize={"14px"}
            color={
              activeStep >= 1 ? "primary.700.light" : "secondary.700.light"
            }
          >
            Personal Information
          </Text>
        </Flex>
        <Box
          width={"100%"}
          height={"2px"}
          bg={activeStep >= 2 ? "primary.600.light" : "#EAECF0"}
        />
        {/* Professional Details  */}
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"24px"}
          height={"24px"}
          minW={"24px"}
          minH={"24px"}
          borderRadius={"50%"}
          bg={activeStep >= 2 ? "primary.600.light" : "base.white.light"}
          border={"2px solid"}
          borderColor={"secondary.100.light"}
          position={"relative"}
        >
          {activeStep >= 3 ? (
            <CheckIcon
              width={"12px"}
              height={"12px"}
              color={"base.white.light"}
            />
          ) : (
            <Box
              width={"8px"}
              height={"8px"}
              borderRadius={"50%"}
              bg={"secondary.200.light"}
            />
          )}
          <Text
            pos={"absolute"}
            bottom={"-24px"}
            left="50%"
            transform="translateX(-50%)"
            whiteSpace={"nowrap"}
            fontWeight={600}
            fontSize={"14px"}
            color={
              activeStep >= 2 ? "primary.700.light" : "secondary.700.light"
            }
          >
            Professional Details
          </Text>
        </Flex>
        <Box
          width={"100%"}
          height={"2px"}
          bg={activeStep >= 3 ? "primary.600.light" : "#EAECF0"}
        />
        {/* Practice/Business  */}
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"24px"}
          height={"24px"}
          minW={"24px"}
          minH={"24px"}
          borderRadius={"50%"}
          bg={activeStep >= 3 ? "primary.600.light" : "base.white.light"}
          border={"2px solid"}
          borderColor={"secondary.100.light"}
          position={"relative"}
        >
          {activeStep >= 4 ? (
            <CheckIcon
              width={"12px"}
              height={"12px"}
              color={"base.white.light"}
            />
          ) : (
            <Box
              width={"8px"}
              height={"8px"}
              borderRadius={"50%"}
              bg={"secondary.200.light"}
            />
          )}
          <Text
            pos={"absolute"}
            bottom={"-24px"}
            left="50%"
            transform="translateX(-50%)"
            whiteSpace={"nowrap"}
            fontWeight={600}
            fontSize={"14px"}
            color={
              activeStep >= 4 ? "primary.700.light" : "secondary.700.light"
            }
          >
            Practice/Business
          </Text>
        </Flex>
        <Box
          width={"100%"}
          height={"2px"}
          bg={activeStep >= 4 ? "primary.600.light" : "#EAECF0"}
        />
        {/* Session & Insurance  */}
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"24px"}
          height={"24px"}
          minW={"24px"}
          minH={"24px"}
          borderRadius={"50%"}
          bg={activeStep === 4 ? "primary.600.light" : "base.white.light"}
          border={"2px solid"}
          borderColor={"secondary.100.light"}
          position={"relative"}
        >
          {activeStep >= 5 ? (
            <CheckIcon
              width={"12px"}
              height={"12px"}
              color={"base.white.light"}
            />
          ) : (
            <Box
              width={"8px"}
              height={"8px"}
              borderRadius={"50%"}
              bg={"secondary.200.light"}
            />
          )}
          <Text
            pos={"absolute"}
            bottom={"-24px"}
            left="50%"
            transform="translateX(-50%)"
            whiteSpace={"nowrap"}
            fontWeight={600}
            fontSize={"14px"}
            color={
              activeStep === 4 ? "primary.700.light" : "secondary.700.light"
            }
          >
            Session & Insurance
          </Text>
        </Flex>
      </Flex>
    );
  }
};

export default StatusTab;
