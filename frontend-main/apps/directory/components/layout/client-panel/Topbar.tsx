"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import NotificationIcon from "@repo/ui/components/icons/NotificationIcon";
import Profile from "@repo/ui/components/profile/Profile";
import { useNotificationsContext } from "../../../contexts/NotificationsContexts";

interface Props {
  header: string;
}

const Topbar = ({ header }: Props) => {
  const { allNotificationDataCount } = useNotificationsContext();

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
      <Profile activeProject="directory" role="client" />
    </Flex>
  );
};

export default Topbar;
