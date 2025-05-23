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
      <Flex
        width={"48px"}
        height={"48px"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"8px"}
        cursor={"pointer"}
        position="relative"
      >
        <NotificationIcon svg={{ width: "24px", height: "24px" }} />
        {allNotificationDataCount > 0 && (
          <Box
            position="absolute"
            top="-2px"
            right="-2px"
            bg="red.500"
            color="white"
            borderRadius="full"
            fontSize="10px"
            fontWeight="bold"
            px="5px"
            minW="18px"
            textAlign="center"
            height="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {allNotificationDataCount}
          </Box>
        )}
      </Flex>
      <Profile activeProject="directory" role="provider" />
    </Flex>
  );
};

export default Topbar;
