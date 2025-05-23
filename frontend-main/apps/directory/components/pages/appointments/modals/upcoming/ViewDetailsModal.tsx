"use client";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import DateIcon from "@repo/ui/components/icons/DateIcon";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import {
  formatDateTimeToReadable,
  getDayOfMonthFromDate,
  getMonthNameFromDate,
  getYearFromDate,
} from "@repo/ui/utils/helpers";
import {
  AppointmentActiveUpcomingAction,
  AppointmentsListResponseData,
} from "@repo/ui/utils/type";
import { Dispatch, SetStateAction, useMemo } from "react";
import CancelAppointmentModal from "./CancelAppointmentModal";
import SendReminderModal from "./SendReminderModal";

interface Props {
  activeUpcomingAction: AppointmentActiveUpcomingAction;
  setActiveUpcomingAction: Dispatch<
    SetStateAction<AppointmentActiveUpcomingAction>
  >;
  clickedRowData: AppointmentsListResponseData | undefined;
  appointmentStatus?: string;
}

const ViewDetailsModal = ({
  activeUpcomingAction,
  setActiveUpcomingAction,
  clickedRowData,
  appointmentStatus,
}: Props) => {
  const forrmattedDate = useMemo(() => {
    if (clickedRowData?.slotTime) {
      const createdAtDay = getDayOfMonthFromDate(clickedRowData?.slotTime);
      const createdAtMonth = getMonthNameFromDate(clickedRowData?.slotTime);
      const createdAtYear = getYearFromDate(clickedRowData?.slotTime);
      return `${createdAtMonth} ${createdAtDay}, ${createdAtYear}`;
    }
    return "-";
  }, [clickedRowData?.slotTime]);

  const formattedTimeRange = clickedRowData?.slotTime
    ? `${formatDateTimeToReadable(clickedRowData.slotTime)} - ${formatDateTimeToReadable(
        new Date(
          new Date(clickedRowData.slotTime).getTime() + 30 * 60 * 1000
        ).toISOString()
      )}`
    : "";

  return (
    <>
      <Modal
        isOpen={activeUpcomingAction === "viewDetails"}
        onClose={() => {
          setActiveUpcomingAction(undefined);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW={"400px"}>
          <ModalHeader overflow={"hidden"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <MultiRadiusIcon
                containerProps={{ marginLeft: "-124px", marginTop: "-116px" }}
                icon={<DateIcon svg={{ width: "24px", height: "24px" }} />}
                outLineColor={"#EAECF0"}
              />
              <ModalCloseButton
                mt={"30px"}
                mr={"12px"}
                color={"secondary.400.light"}
                width={"12px"}
                height={"12px"}
              />
            </Flex>
          </ModalHeader>
          <ModalBody mt={"-146px"}>
            <Text
              color={"secondary.950.light"}
              fontWeight={600}
              fontSize={"18px"}
              mt={"16px"}
            >
              Details Appointment
            </Text>
            <Text
              color={"secondary.600.light"}
              fontWeight={400}
              fontSize={"14px"}
              mb={"24px"}
            >
              Review and manage the details of your upcoming appointment here.
            </Text>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Tracking Code
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                #{clickedRowData?.id}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Patient Name
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                {clickedRowData?.client?.firstName &&
                clickedRowData?.client?.lastName
                  ? `${clickedRowData?.client?.firstName} ${clickedRowData?.client?.lastName}`
                  : "-"}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Email
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                {clickedRowData?.client?.email || "-"}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Date
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                {forrmattedDate}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Time
              </Text>
              <Text
                color="secondary.950.light"
                fontWeight={500}
                fontSize="14px"
              >
                {formattedTimeRange}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Duration
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                30 Min
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Type
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                {clickedRowData?.appointmentType?.type || " "}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"secondary.100.light"}
              pb={"6px"}
            >
              <Text
                fontWeight={400}
                fontSize={"14px"}
                color={"secondary.500.light"}
              >
                Status
              </Text>
              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"14px"}
              >
                {clickedRowData?.status || "-"}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"center"} gap={"16px"}>
            {appointmentStatus !== "cancelled" &&
              appointmentStatus !== "past" && (
                <Button
                  type="button"
                  bg={"base.white.light"}
                  border={"1px solid"}
                  borderColor={"error.100.light"}
                  borderRadius={"8px"}
                  color={"error.500.light"}
                  width={"100%"}
                  _hover={{ bg: undefined }}
                  _focus={{ bg: undefined }}
                  _active={{ bg: undefined }}
                  onClick={() => {
                    setActiveUpcomingAction("cancelAppointment");
                  }}
                >
                  Cancel Appt
                </Button>
              )}

            <Button
              type="button"
              bg={"base.white.light"}
              border={"1px solid"}
              borderColor={"primary.200.light"}
              borderRadius={"8px"}
              color={"primary.600.light"}
              width={"100%"}
              _hover={{ bg: undefined }}
              _focus={{ bg: undefined }}
              _active={{ bg: undefined }}
              onClick={() => {
                setActiveUpcomingAction("sendReminder");
              }}
            >
              Send Reminder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SendReminderModal
        activeUpcomingAction={activeUpcomingAction}
        setActiveUpcomingAction={setActiveUpcomingAction}
        clickedRowData={clickedRowData}
      />
      <CancelAppointmentModal
        activeUpcomingAction={activeUpcomingAction}
        setActiveUpcomingAction={setActiveUpcomingAction}
        clickedRowData={clickedRowData}
      />
    </>
  );
};

export default ViewDetailsModal;
