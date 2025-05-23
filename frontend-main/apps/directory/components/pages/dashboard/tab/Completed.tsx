"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import RoundedFillCheckIcon from "@repo/ui/components/icons/RoundedFillCheckIcon";
import StackedLayerIcon from "@repo/ui/components/icons/StackedLayerIcon";
import { colors } from "@repo/ui/theme";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
}

const Completed = ({ setActiveStep }: Props) => {
  const [stackedLayerHovered, setStackedLayerHovered] = useState(false);

  return (
    <Box
      bg={"base.white.light"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      overflow={"hidden"}
      mt={"24px"}
      p={"16px 32px"}
    >
      {/* Check Icon */}
      <Flex
        width={"480px"}
        height={"480px"}
        mx={"auto"}
        mt={"-130px"}
        borderRadius={"9999px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          width={"384px"}
          height={"384px"}
          borderRadius={"9999px"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            width={"288px"}
            height={"288px"}
            borderRadius={"9999px"}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              width={"192px"}
              height={"192px"}
              borderRadius={"9999px"}
              border={"1px solid"}
              borderColor={"secondary.100.light"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Flex
                width={"96px"}
                height={"96px"}
                borderRadius={"9999px"}
                bg={"success.50.light"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <RoundedFillCheckIcon svg={{ width: "40px", height: "40px" }} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"16px"}
        mt={"-180px"}
      >
        <Text fontWeight={700} fontSize={"36px"} color={"secondary.950.light"}>
          Congratulations!
        </Text>
        <Text fontWeight={500} fontSize={"20px"} color={"secondary.900.light"}>
          Your information has been successfully submitted. 🎉
        </Text>
        <Text
          fontWeight={400}
          fontSize={"18px"}
          color={"secondary.600.light"}
          maxW={"784px"}
        >
          Your account is now active with 14 days of free access to all
          TeleWellness Hub features. Experience our services fully during this
          trial period. Afterward, choose a plan to continue providing the best
          for yourself and your clients.
        </Text>
        <Button
          type="button"
          borderRadius={"8px"}
          bg={"primary.500.light"}
          color={"base.white.light"}
          fontWeight={600}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          fontSize={"16px"}
          mt={"16px"}
          _hover={{ bg: "base.white.light", color: "primary.500.light" }}
          _active={{ bg: "base.white.light", color: "primary.500.light" }}
          onMouseEnter={() => {
            setStackedLayerHovered(true);
          }}
          onMouseLeave={() => {
            setStackedLayerHovered(false);
          }}
          onClick={() => {
            setActiveStep(6);
          }}
        >
          <StackedLayerIcon
            svg={{
              width: "20px",
              height: "20px",
              style: { marginRight: "6px" },
              onMouseEnter: () => {
                setStackedLayerHovered(true);
              },
              onMouseLeave: () => {
                setStackedLayerHovered(false);
              },
            }}
            path={{
              fill: stackedLayerHovered
                ? colors.primary["500"].light
                : colors.base.white.light,
            }}
          />
          View and Purchase Plans
        </Button>
      </Flex>
    </Box>
  );
};

export default Completed;
