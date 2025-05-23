"use client";
import { Flex, Text } from "@chakra-ui/react";
import Profile from "@repo/ui/components/profile/Profile";

interface Props {
  header: string;
}

const Topbar = ({ header }: Props) => {
  return (
    <Flex
      borderRadius={"16px"}
      width={"100%"}
      height={"80px"}
      bg={"white"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      alignItems={"center"}
      padding={"16px 24px"}
    >
      <Text
        fontWeight={600}
        fontSize={"20px"}
        color={"grayScale.950.light"}
        marginRight={"auto"}
      >
        {header}
      </Text>
      <Profile activeProject="admin" role="admin" />
    </Flex>
  );
};

export default Topbar;
