import {
  Box,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Ellips from "@repo/ui/assets/Ellips.png";
import calendarIcon from "@repo/ui/assets/calendar.png";
import headphoneIcon from "@repo/ui/assets/headphone.png";
import Pagination from "@repo/ui/components/Pagination";
import ListNoDataFound from "@repo/ui/components/list/ListNoDataFound";
import {
  markNotificationAsRead,
  providerGetNotifications,
} from "@repo/ui/utils/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useNotificationsContext } from "../../../../contexts/NotificationsContexts";
const AllNotifications = () => {
  const { debouncedSearchValue, setAllNotificationDataCount, activeTab } =
    useNotificationsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["providerNotifications", debouncedSearchValue, currentPage, 20],
    queryFn: () =>
      providerGetNotifications({
        page: currentPage,
        limit: 10,
        keyword: debouncedSearchValue,
      }),
    // enabled: activeTab === "allNotifications",
  });
  const [selectedNotification, setSelectedNotification] = useState<any | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (data?.data?.meta?.totalDocs) {
      setAllNotificationDataCount(data?.data?.meta?.totalDocs);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) {
    return (
      <ListNoDataFound containerProps={{ height: "calc(100dvh - 290px)" }} />
    );
  } else if (isLoading) {
    return (
      <Flex
        width={"100%"}
        height={"calc(100dvh - 290px)"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner width={"50px"} height={"50px"} color="secondary.500.light" />
      </Flex>
    );
  }
  return (
    <>
      <VStack>
        {data.data?.data?.map((notification: any, index: number) => (
          <Fragment key={index}>
            <HStack
              w={"100%"}
              h={"48px"}
              justifyContent={"space-between"}
              cursor={"pointer"}
              onClick={async () => {
                setSelectedNotification(notification);
                onOpen();
                if (!notification.isRead) {
                  try {
                    await markNotificationAsRead(notification.id);
                    notification.isRead = true;
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              <HStack gap={"12px"}>
                <Box
                  w={"48px"}
                  h={"48px"}
                  borderRadius={"100%"}
                  padding={"12px"}
                  gap={"10px"}
                  bgColor={"primary.100.light"}
                >
                  {notification.type === "support" && (
                    <Image
                      src={headphoneIcon.src}
                      width={48}
                      height={48}
                      alt="calendar"
                    />
                  )}
                  {notification.type === "appointment" && (
                    <Image
                      src={calendarIcon.src}
                      width={48}
                      height={48}
                      alt="calendar"
                    />
                  )}
                </Box>
                <VStack
                  w={"810px"}
                  h={"46px"}
                  gap={"4px"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    color={"secondary.950.light"}
                  >
                    {notification.header}
                  </Text>
                  <Text
                    fontWeight={"400"}
                    fontSize={"12px"}
                    color={"secondary.500.light"}
                    cursor="pointer"
                  >
                    {notification.message}
                  </Text>
                </VStack>
              </HStack>
              <VStack
                w="138px"
                minH="48px"
                gap="4px"
                alignItems="flex-end"
                mt="32px"
                pr="24px"
              >
                <Box
                  w="8px"
                  h="8px"
                  visibility={notification.isRead ? "hidden" : "visible"}
                >
                  <Image src={Ellips} width={8} height={8} alt="unread-dot" />
                </Box>
                <Text
                  fontWeight="400"
                  fontSize="12px"
                  color="secondary.500.light"
                >
                  {new Date(notification.createdAt).toLocaleString()}
                </Text>
              </VStack>
            </HStack>
            <Divider />
          </Fragment>
        ))}
        {data?.data.data.length > 0 && !isLoading && !isError && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data?.meta?.totalPages || 1}
            onPageChange={handlePageChange}
            containerProps={{ mt: "16px" }}
          />
        )}
      </VStack>
      {selectedNotification && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
          <ModalOverlay />
          <ModalContent p={4}>
            <ModalHeader>
              <HStack spacing={3}>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg="primary.100.light"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {selectedNotification.type === "support" && (
                    <Image
                      src={headphoneIcon.src}
                      width={24}
                      height={24}
                      alt="support icon"
                    />
                  )}
                  {selectedNotification.type === "appointment" && (
                    <Image
                      src={calendarIcon.src}
                      width={24}
                      height={24}
                      alt="appointment icon"
                    />
                  )}
                </Box>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color="secondary.950.light"
                >
                  {selectedNotification.header}
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="start" spacing={3}>
                <Text fontSize="14px" color="gray.700">
                  {selectedNotification.message}
                </Text>
                <Text fontSize="12px" color="gray.500">
                  Created At:
                  {new Date(selectedNotification.createdAt).toLocaleString()}
                </Text>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AllNotifications;
