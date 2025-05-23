"use client";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ClockIcon from "@repo/ui/components/icons/ClockIcon";
import EmailIcon from "@repo/ui/components/icons/EmailIcon";
import LocationIcon from "@repo/ui/components/icons/LocationIcon";
import UserIcon from "@repo/ui/components/icons/UserIcon";
import ListNoDataFound from "@repo/ui/components/list/ListNoDataFound";
import { getAppointmentList } from "@repo/ui/utils/api";
import {
  capitalizeFirstLetter,
  getDayOfMonthFromDate,
  getMonthNameFromDate,
  getTimeFromDateString,
  getYearFromDate,
} from "@repo/ui/utils/helpers";
import {
  AppointmentActiveUpcomingAction,
  AppointmentsListResponseData,
} from "@repo/ui/utils/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useAppointmentsContext } from "../../../../contexts/AppointmentsContexts";
import Pagination from "@repo/ui/components/Pagination";
import ViewDetailsModal from "../modals/upcoming/ViewDetailsModal";
import { colors } from "@repo/ui/theme";
const PastTab = () => {
  const [activeUpcomingAction, setActiveUpcomingAction] =
    useState<AppointmentActiveUpcomingAction>(undefined);
  const { debouncedSearchValue, setPastDataCount } = useAppointmentsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedRowData, setClickedRowData] = useState<
    AppointmentsListResponseData | undefined
  >(undefined);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "appointments-list",
      debouncedSearchValue,
      currentPage,
      20,
      "past",
    ],
    queryFn: (options) => {
      return getAppointmentList({
        keyword: options?.queryKey[1] as string,
        page: options?.queryKey[2] as number,
        limit: options?.queryKey[3] as number,
        status: options?.queryKey[4] as "Pasted",
      });
    },
  });

  useEffect(() => {
    if (data?.data?.meta?.totalDocs) {
      setPastDataCount(data.data.meta.totalDocs);
    }
  }, [data]);

  const dataSide = useMemo(() => {
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
    } else {
      return data?.data?.data?.map((item) => {
        const createdAtDay = getDayOfMonthFromDate(item?.slotTime);
        const createdAtMonth = getMonthNameFromDate(item?.slotTime);
        const createdAtYear = getYearFromDate(item?.slotTime);
        const slotTime = getTimeFromDateString(item?.slotTime);
        return (
          <Flex
            key={item.id}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            borderRadius={"16px"}
            mb={"8px"}
            alignItems={"center"}
            padding={"16px 32px 16px 16px"}
          >
            <Box
              borderRight={"1px solid"}
              borderColor={"secondary.100.light"}
              width={"90px"}
              minW={"90px"}
              textAlign={"center"}
              paddingRight={"16px"}
            >
              <Text
                textAlign={"center"}
                color={"secondary.950.light"}
                fontSize={"30px"}
                fontWeight={700}
              >
                {createdAtDay}
              </Text>
              <Text
                color={"secondary.600.light"}
                fontWeight={400}
                fontSize={"12px"}
              >
                {createdAtMonth}, {createdAtYear}
              </Text>
            </Box>
            <Flex
              width={"90px"}
              minW={"90px"}
              flexDirection={"column"}
              mx={{ base: "16px", md: "50px" }}
              gap={"8px"}
            >
              <Text
                color={"secondary.500.light"}
                fontWeight={400}
                fontSize={"12px"}
              >
                Tracking Code
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                #{item?.id}
              </Text>
            </Flex>
            {/* Time and status */}
            <Flex
              width={"90px"}
              minW={"90px"}
              flexDirection={"column"}
              gap={"8px"}
              mx={{ base: "16px", md: "50px" }}
            >
              <Flex alignItems={"center"} gap={"4px"}>
                <ClockIcon
                  svg={{ width: "16px", height: "16px" }}
                  path={{ fill: colors.primary["500"].light }}
                />
                <Text
                  color={"secondary.950.light"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {slotTime}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={"4px"}>
                <LocationIcon
                  svg={{ width: "16px", height: "16px" }}
                  path={{ fill: colors.primary["500"].light }}
                />
                <Text
                  color={"secondary.950.light"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {item?.appointmentType?.type
                    ? capitalizeFirstLetter(item?.appointmentType?.type)
                    : "-"}
                </Text>
              </Flex>
            </Flex>
            {/* user and email */}
            <Flex
              width={"220px"}
              minW={"220px"}
              flexDirection={"column"}
              gap={"8px"}
              mx={{ base: "16px", md: "50px" }}
            >
              <Flex alignItems={"center"} gap={"4px"}>
                <UserIcon
                  svg={{ width: "16px", height: "16px" }}
                  path={{ fill: colors.primary["500"].light }}
                />
                <Text
                  color={"secondary.950.light"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {item?.client?.firstName && item?.client?.lastName
                    ? `${item?.client?.firstName} ${item?.client?.lastName}`
                    : "-"}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={"4px"}>
                <EmailIcon
                  svg={{ width: "16px", height: "16px" }}
                  path={{ fill: colors.primary["500"].light }}
                />
                <Text
                  color={"secondary.950.light"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {item?.client?.email || "-"}
                </Text>
              </Flex>
            </Flex>
            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                border={"1px solid"}
                borderColor={"primary.200.light"}
                color={"primary.500.light"}
                bg={"base.white.light"}
                marginLeft={"auto"}
                borderRadius={"8px"}
                _hover={{ bg: "secondary.50.light" }}
                _active={{ bg: "transparent" }}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem
                  _hover={{ bg: "secondary.50.light" }}
                  onClick={() => {
                    setClickedRowData(item);
                    setActiveUpcomingAction("viewDetails");
                  }}
                >
                  View Details
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        );
      });
    }
  }, [data, isLoading, isError]);

  return (
    <>
      {dataSide}
      {data?.data.data &&
        data?.data.data.length > 0 &&
        !isLoading &&
        !isError && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data?.meta?.totalPages || 1}
            onPageChange={handlePageChange}
            containerProps={{ mt: "16px" }}
          />
        )}
      <ViewDetailsModal
        activeUpcomingAction={activeUpcomingAction}
        setActiveUpcomingAction={setActiveUpcomingAction}
        clickedRowData={clickedRowData}
        appointmentStatus={"past"}
      />
    </>
  );
};

export default PastTab;
