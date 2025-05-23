"use client";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import AngleUpIcon from "@repo/ui/components/icons/AngleUpIcon";
import CustomSelect from "@repo/ui/components/elements/CustomSelect";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { createAppointment } from "@repo/ui/utils/api";
import {
  CustomSelectOption,
  ProviderGetMeResponseData,
  ResponseData,
} from "@repo/ui/utils/type";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import RoundedSuccessDateIcon from "@repo/ui/components/icons/RoundedSuccessDateIcon";
import {
  formatDateTimeToReadable,
  formatDateToReadable,
  getFormattedDateTime,
} from "@repo/ui/utils/helpers";

interface TimeSlot {
  label: string;
  available: boolean;
  numericValue: number;
}

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  providerId: number | undefined;
  refetchAppointments: any;
  insurance: any;
  providerAvailability: any;
  providerAppointment: any;
  data: ResponseData<ProviderGetMeResponseData> | undefined;
}

const weekdayMap = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function getRemainingDaysInMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = [];

  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let day = today.getDate(); day <= lastDay; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function generateTimeSlotsForDate(
  date: Date,
  availability: Props["providerAvailability"]
): TimeSlot[] {
  const dayIndex = date.getDay();
  const dayName = weekdayMap[dayIndex];

  const dayAvailability = availability.find(
    (a: any) => a.dayOfWeek.toLowerCase() === dayName
  );

  if (
    !dayAvailability ||
    typeof dayAvailability.startTime !== "string" ||
    typeof dayAvailability.endTime !== "string"
  ) {
    return [];
  }

  const [startHourStr, startMinStr] = dayAvailability.startTime.split(":");
  const [endHourStr, endMinStr] = dayAvailability.endTime.split(":");

  const startHour = parseInt(startHourStr as string, 10);
  const startMin = parseInt(startMinStr as string, 10);
  const endHour = parseInt(endHourStr as string, 10);
  const endMin = parseInt(endMinStr as string, 10);

  let start = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;

  const slots: TimeSlot[] = [];

  while (start + 30 <= end) {
    const hours = Math.floor(start / 60);
    const mins = start % 60;
    const amPm = hours >= 12 ? "PM" : "AM";
    const displayHour = ((hours + 11) % 12) + 1;
    const displayMins = mins === 0 ? "00" : mins.toString().padStart(2, "0");

    slots.push({
      label: `${displayHour}:${displayMins} ${amPm}`,
      available: true,
      numericValue: start / 60,
    });

    start += 30;
  }

  return slots;
}

const BookAppointmentModal = ({
  isOpen,
  setIsOpen,
  providerId,
  refetchAppointments,
  insurance,
  providerAvailability,
  providerAppointment,
  data,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [visitType, setVisitType] = useState("In Person");
  const [visitReason, setVisitReason] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const showToast = useToastNotification();
  const [modalViewType, setModalViewType] = useState<
    "bookAppointment" | "success"
  >("bookAppointment");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createResponseData, setCreateResponseData] = useState<any>(undefined);

  const insuranceId = selectedInsurance?.value as number | null;

  useEffect(() => {
    const availableDates = getRemainingDaysInMonth();
    setDates(availableDates);
    setSelectedDate(availableDates[0] || null);
  }, []);

  useEffect(() => {
    if (!selectedDate || !providerAvailability?.length) return;

    const selectedDateStr = selectedDate.toDateString();
    const busySlots = new Set<number>();

    if ((providerAppointment as any)?.data?.length) {
      (providerAppointment as any).data.forEach((item: any) => {
        const slotUTC = new Date(item.slotTime);
        const slot = new Date(
          slotUTC.getUTCFullYear(),
          slotUTC.getUTCMonth(),
          slotUTC.getUTCDate(),
          slotUTC.getUTCHours(),
          slotUTC.getUTCMinutes()
        );

        if (slot.toDateString() === selectedDateStr) {
          const totalMinutes = slot.getHours() * 60 + slot.getMinutes();
          busySlots.add(totalMinutes);
        }
      });
    }

    const generatedSlots = generateTimeSlotsForDate(
      selectedDate,
      providerAvailability
    );

    const updatedSlots = generatedSlots.map((slot) => {
      const hour = Math.floor(slot.numericValue);
      const mins = (slot.numericValue % 1) * 60;
      const totalMinutes = hour * 60 + mins;
      return {
        ...slot,
        available: !busySlots.has(totalMinutes),
      };
    });

    setTimeSlots(updatedSlots);
    setSelectedSlot(null);
    setShowMore(false);
  }, [selectedDate, providerAppointment, providerAvailability]);

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      showToast("Error", "Please select a date and time slot", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const [hourStr, minutePart] = selectedSlot.label.split(":");
      const minutes = parseInt((minutePart as string).slice(0, 2), 10);
      const isPM = selectedSlot.label.includes("PM");
      const selectedHour = (parseInt(hourStr as string) % 12) + (isPM ? 12 : 0);

      const appointmentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedHour,
        minutes,
        0,
        0
      );

      const slotTime = appointmentDate
        .toLocaleString("sv-SE")
        .replace(" ", "T");
      const payload = {
        slotTime,
        providerId: providerId as number,
        insuranceId: insuranceId as number,
        reason: (visitReason?.value as string) || "Routine check-up",
        appointmentTypeId: visitType === "In Person" ? 1 : 2,
      };

      const response = await createAppointment(payload);
      setCreateResponseData(response);
      refetchAppointments();
      setIsSubmitting(false);
      setModalViewType("success");
    } catch (error) {
      setIsSubmitting(false);
      showToast("Error", "Failed to book the appointment", "error");
      setModalViewType("bookAppointment");
    }
  };

  const edittedAppointmentType = useMemo(() => {
    if (
      !data?.data?.appointmentType ||
      data?.data?.appointmentType?.length === 0
    ) {
      return [];
    }

    const result = [];

    const hasOnline = data?.data?.appointmentType?.some((item) =>
      [2, 3, 4].includes(item.id)
    );
    const hasInPerson = data?.data?.appointmentType?.some(
      (item) => item.id === 1
    );

    if (hasInPerson) {
      result.push({ id: 1, name: "In Person" });
    }

    if (hasOnline) {
      result.push({ id: 2, name: "Online" });
    }

    return result;
  }, [data?.data?.appointmentType]);

  const displayedSlots = showMore
    ? timeSlots
    : timeSlots.filter((slot) => slot.numericValue <= 13.5);

  const visibleDates = dates.slice(currentIndex, currentIndex + 4);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 4, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 4 < dates.length ? prev + 4 : prev));

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      size={"full"}
    >
      <ModalOverlay />
      <ModalContent minH={"100%"}>
        <ModalHeader
          bg={"base.white.light"}
          boxShadow="0px 6px 24px 0px #18273414"
        >
          <Flex alignItems={"center"}>
            <AngleUpIcon
              svg={{
                width: "22px",
                height: "22px",
                style: { transform: "rotate(-90deg)" },
                cursor: "pointer",
                onClick: () => setIsOpen(false),
              }}
            />
            <Text width={"100%"} textAlign={"center"}>
              {modalViewType === "bookAppointment" ? "Choose Time" : "Success"}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody minH={"100%"}>
          {modalViewType === "bookAppointment" ? (
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"16px"}
            >
              <HStack
                w="100%"
                h="44px"
                bg="secondary.50.light"
                border="1px solid"
                borderColor={"secondary.50.light"}
                borderRadius="10px"
                gap="4px"
                p={"4px"}
              >
                {edittedAppointmentType?.map((type) => (
                  <Button
                    key={type.id}
                    color={"primary.500.light"}
                    bg={
                      visitType === type.name
                        ? "base.white.light"
                        : "transparent"
                    }
                    width={"100%"}
                    h="36px"
                    borderRadius="6px"
                    fontSize={"16px"}
                    onClick={() => setVisitType(type.name)}
                    _hover={{ bg: "base.white.light" }}
                  >
                    {type.name}
                  </Button>
                ))}
              </HStack>

              <VStack gap="8px" width={"100%"}>
                <VStack w="100%" gap="8px" alignItems="flex-start">
                  <Text
                    fontWeight="500"
                    fontSize="14px"
                    color="secondary.700.light"
                  >
                    Visit Reason
                  </Text>

                  <CustomSelect
                    placeholder="Popular Visit Reason"
                    options={[
                      { value: "checkup", label: "Checkup" },
                      { value: "consultation", label: "Consultation" },
                      { value: "emergency", label: "Emergency" },
                    ]}
                    selectedOption={visitReason}
                    setSelectedOption={setVisitReason}
                    containerProps={{
                      w: "100%",
                      h: "40px",
                      textColor: "secondary.400.light",
                    }}
                  />
                </VStack>
                <VStack alignItems="flex-start" w="100%">
                  <Text
                    fontWeight="500"
                    fontSize="14px"
                    color="secondary.700.light"
                  >
                    Insurance
                  </Text>
                  <CustomSelect
                    placeholder="Select your insurance"
                    options={insurance.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    selectedOption={selectedInsurance}
                    setSelectedOption={setSelectedInsurance}
                    containerProps={{
                      w: "100%",
                      h: "40px",
                      textColor: "secondary.400.light",
                    }}
                  />
                </VStack>
              </VStack>

              <HStack gap="8px" width={"100%"}>
                <Icon
                  as={MdKeyboardArrowLeft}
                  boxSize={{ base: 6, lg: 8 }}
                  color="grayScale.300.light"
                  cursor="pointer"
                  onClick={handlePrev}
                />
                {visibleDates.map((date, idx) => {
                  const dayStr = date.toDateString().slice(0, 3);
                  const monthDay = `${date.toDateString().slice(4, 7)} ${date.getDate()}`;
                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString();

                  return (
                    <Button
                      key={idx}
                      w={"100%"}
                      h="58px"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor={
                        isSelected ? "primary.500.light" : "secondary.100.light"
                      }
                      textColor={
                        isSelected ? "primary.500.light" : "secondary.950.light"
                      }
                      onClick={() => setSelectedDate(date)}
                      bg="base.white.light"
                    >
                      <VStack spacing={0}>
                        <Text fontSize="sm">{dayStr}</Text>
                        <Text fontSize="xs">{monthDay}</Text>
                      </VStack>
                    </Button>
                  );
                })}
                <Icon
                  as={MdKeyboardArrowRight}
                  boxSize={{ base: 6, lg: 8 }}
                  color="grayScale.300.light"
                  cursor="pointer"
                  onClick={handleNext}
                />
              </HStack>

              <VStack
                width={"100%"}
                height={showMore ? "auto" : "160px"}
                gap="8px"
              >
                {timeSlots.length === 0 && (
                  <Text
                    display={"flex"}
                    height={"100%"}
                    textAlign={"center"}
                    alignItems={"center"}
                    fontSize="16px"
                    color="secondary.500.light"
                    justifyContent={"center"}
                  >
                    No available time slots for this day.
                  </Text>
                )}
                <SimpleGrid
                  columns={4}
                  gap="8px"
                  overflow={"hidden"}
                  paddingX={"30px"}
                  width={"100%"}
                >
                  {displayedSlots.map((slot, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      isDisabled={!slot.available}
                      w={"100%"}
                      h="34px"
                      borderRadius="8px"
                      border="1px solid"
                      padding="8px 13px"
                      bg="base.white.light"
                      borderColor={
                        selectedSlot?.label === slot.label
                          ? "primary.500.light"
                          : "secondary.100.light"
                      }
                    >
                      <Text
                        color="secondary.500.light"
                        fontWeight="400"
                        fontSize="12px"
                      >
                        {slot.label}
                      </Text>
                    </Button>
                  ))}
                </SimpleGrid>
                {!showMore && timeSlots.length > displayedSlots.length && (
                  <Button
                    w="79px"
                    h="34px"
                    borderRadius="8px"
                    padding="8px 12px"
                    bg="primary.50.light"
                    onClick={() => setShowMore(true)}
                  >
                    <Text
                      fontWeight="600"
                      fontSize="12px"
                      color={"primary.500.light"}
                    >
                      More
                    </Text>
                    <Icon
                      as={MdKeyboardArrowDown}
                      size={8}
                      color={"primary.500.light"}
                    />
                  </Button>
                )}
              </VStack>
            </Flex>
          ) : (
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"24px"}
              height={"100%"}
            >
              <Flex
                width={"100%"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"16px"}
              >
                <RoundedSuccessDateIcon />
                <Text
                  textAlign={"center"}
                  color={"secondary.950.light"}
                  fontWeight={600}
                  fontSize={"18px"}
                  maxW={{ base: "320px", sm: "100%" }}
                >
                  Your Appointment has been Successfully Registered
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={"4px"}>
                <Text
                  color={"secondary.500.light"}
                  fontSize={"16px"}
                  fontWeight={400}
                >
                  Tracking Code:
                </Text>
                <Text
                  color={"secondary.950.light"}
                  fontWeight={600}
                  fontSize={"16px"}
                >
                  {data?.data?.id || "-"}
                </Text>
              </Flex>
              <Flex width={"100%"} flexDirection={"column"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid"}
                  borderColor={"secondary.100.light"}
                  paddingBottom={"16px"}
                >
                  <Text
                    color={"secondary.500.light"}
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    Date
                  </Text>
                  <Text
                    color={"secondary.950.light"}
                    fontSize={"14px"}
                    fontWeight={500}
                  >
                    {formatDateToReadable(createResponseData?.data?.slotTime)}
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid"}
                  borderColor={"secondary.100.light"}
                  paddingBottom={"16px"}
                  paddingTop={"16px"}
                >
                  <Text
                    color={"secondary.500.light"}
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    Time
                  </Text>
                  <Text
                    color={"secondary.950.light"}
                    fontSize={"14px"}
                    fontWeight={500}
                  >
                    {formatDateTimeToReadable(
                      createResponseData?.data?.slotTime
                    )}
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid"}
                  borderColor={"secondary.100.light"}
                  paddingBottom={"16px"}
                  paddingTop={"16px"}
                >
                  <Text
                    color={"secondary.500.light"}
                    fontWeight={400}
                    fontSize={"14px"}
                  >
                    Address
                  </Text>
                  <Text
                    color={"secondary.950.light"}
                    fontSize={"14px"}
                    fontWeight={500}
                    textAlign={"end"}
                    maxW={{ base: "150px", sm: "100%" }}
                  >
                    {data?.data?.address?.streetAddress || ""},
                    {data?.data?.address?.city || ""},{" "}
                    {data?.data?.address?.zipCode || ""},{" "}
                    {data?.data?.address?.country || ""}
                  </Text>
                </Flex>
              </Flex>
              <Button
                width="100%"
                h="48px"
                borderRadius="8px"
                padding="12px 18px"
                fontWeight={600}
                fontSize="14px"
                gap="6px"
                border="1px solid"
                borderColor="primary.500.light"
                color="base.white.light"
                bg="primary.500.light"
                _hover={{
                  bg: "base.white.light",
                  color: "primary.500.light",
                }}
                _active={{
                  bg: "base.white.light",
                  color: "primary.500.light",
                }}
                disabled={isSubmitting}
                _disabled={{ opacity: 1 }}
                onClick={() => {}}
              >
                View Appointments
              </Button>
            </Flex>
          )}
        </ModalBody>
        {modalViewType === "bookAppointment" && (
          <ModalFooter boxShadow="0px 6px 24px 0px #18273414">
            <Button
              width={"100%"}
              h="48px"
              borderRadius="8px"
              padding="12px 18px"
              fontWeight={600}
              fontSize={"14px"}
              gap="6px"
              border={"1px solid"}
              borderColor={"primary.500.light"}
              color={"base.white.light"}
              bg={isSubmitting ? "base.white.light" : "primary.500.light"}
              _hover={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              _active={{
                bg: "base.white.light",
                color: "primary.500.light",
              }}
              disabled={isSubmitting}
              _disabled={{ opacity: 1 }}
              onClick={handleBookAppointment}
            >
              {isSubmitting ? (
                <Spinner color="secondary.500.light" />
              ) : (
                "Book Appointment"
              )}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookAppointmentModal;
