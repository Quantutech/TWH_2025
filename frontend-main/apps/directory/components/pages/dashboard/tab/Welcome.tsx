"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import handIcon from "@repo/ui/assets/provider-panel/hand-icon.webp";
import { useQuery } from "@tanstack/react-query";
import { providerGetMe } from "@repo/ui/utils/api";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
}

const Welcome = ({ setActiveStep }: Props) => {
  const { data } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
  });

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
      {/* Hand icon */}
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
                bg={"primary.50.light"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={handIcon.src} width={"40px"} height={"40px"} />
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
          Hello {data?.data?.firstName}!
        </Text>
        <Text fontWeight={500} fontSize={"20px"} color={"secondary.900.light"}>
          Welcome to your Dashboard on TeleWellness Hub!
        </Text>
        <Text
          fontWeight={400}
          fontSize={"18px"}
          color={"secondary.600.light"}
          maxW={"784px"}
        >
          To get started and activate your account, please complete your
          information. This step is essential to access all platform features
          and be ready to receive client bookings.
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
          onClick={() => {
            setActiveStep(1);
          }}
        >
          Complete Your Information
        </Button>
      </Flex>
    </Box>
  );
};

export default Welcome;
