"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import CustomSelect from "@repo/ui/components/elements/CustomSelect";
import { createAppointment, getAppointmentDate } from "@repo/ui/utils/api";
import { CustomSelectOption } from "@repo/ui/utils/type";
import { useQuery } from "@tanstack/react-query";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { getCookie } from "@repo/ui/utils/storage";
import CreateAppointmentSuccessModal from "./modals/CreateAppointmentSuccessModal";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { useRouter } from "next/navigation";

interface TimeSlot {
  label: string;
  available: boolean;
  numericValue: number;
}

interface AppointmentSchedulerProps {
  providerId?: number;
  insurance: any;
  appointmentCalendarType: any;
  providerAvailability: any;
  googleCalendarLink: string;
  address: any;
  appointmentType:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
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
  availability: AppointmentSchedulerProps["providerAvailability"]
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

export default function AppointmentScheduler({
  providerId,
  insurance,
  appointmentCalendarType,
  providerAvailability,
  googleCalendarLink,
  address,
  appointmentType,
}: AppointmentSchedulerProps) {
  const [visitType, setVisitType] = useState<string | undefined>(undefined);
  const [visitReason, setVisitReason] = useState<CustomSelectOption>();
  const [selectedInsurance, setSelectedInsurance] = useState<
    CustomSelectOption | undefined
  >(undefined);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const insuranceId = selectedInsurance?.value as number | null;
  const [role, setRole] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<boolean | undefined>(undefined);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [createResponseData, setCreateResponseData] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const showToast = useToastNotification();

  const { data: providerAppointment, refetch: refetchAppointments } = useQuery({
    queryKey: ["providerAppointment", providerId],
    queryFn: (options) =>
      getAppointmentDate({
        providerId: options.queryKey[1] as number,
      }),
    enabled: !!providerId,
  });

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

  useEffect(() => {
    const role = getCookie("role");
    if (role) {
      setRole(JSON.parse(role as string));
    }
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setToken(JSON.parse(token as string));
    }
  }, []);

  const handleBookAppointment = async () => {
    if (!token) {
      router.push("/client-sign-in");
      return;
    }

    if (token && role !== "client") {
      router.push("/client-sign-in");
      return;
    }

    if (submitting) {
      return;
    }
    if (!selectedDate || !selectedSlot || !visitReason?.value) {
      showToast(
        "Missing Information",
        "Please select a date, time slot, and reason for your visit.",
        "error"
      );
      return;
    }

    try {
      setSubmitting(true);
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
      setIsSuccessModalOpen(true);
      refetchAppointments();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setIsSuccessModalOpen(false);
      showToast("Error", "Failed to book an appointment", "error");
    }
  };

  const displayedSlots = showMore
    ? timeSlots
    : timeSlots.filter((slot) => slot.numericValue <= 13.5);

  const visibleDates = dates.slice(currentIndex, currentIndex + 4);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 4, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 4 < dates.length ? prev + 4 : prev));

  const edittedAppointmentType = useMemo(() => {
    if (!appointmentType || appointmentType.length === 0) {
      return [];
    }

    const result = [];

    const hasOnline = appointmentType.some((item) =>
      [2, 3, 4].includes(item.id)
    );
    const hasInPerson = appointmentType.some((item) => item.id === 1);

    if (hasInPerson) {
      result.push({ id: 1, name: "In Person" });
    }

    if (hasOnline) {
      result.push({ id: 2, name: "Online" });
    }

    return result;
  }, [appointmentType]);

  useEffect(() => {
    if (!appointmentType || appointmentType.length === 0) return;

    const hasOnline = appointmentType.some((item) =>
      [2, 3, 4].includes(item.id)
    );
    const hasInPerson = appointmentType.some((item) => item.id === 1);

    if (hasInPerson) {
      setVisitType("In Person");
    } else if (hasOnline) {
      setVisitType("Online");
    }
  }, [appointmentType]);

  return (
    <>
      <VStack
        bg="base.white.light"
        width={"100%"}
        border="1px solid"
        borderColor={"secondary.100.light"}
        borderRadius="16px"
        padding={{ base: "16px", lg: "24px" }}
        mb={{ base: "16px", lg: "24px" }}
      >
        {appointmentCalendarType == "external" ? (
          <Button
            type="button"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={{ base: "40px", xl: "48px" }}
            fontWeight={600}
            fontSize="14px"
            border="1px solid"
            borderColor="primary.500.light"
            borderRadius="8px"
            bg="primary.500.light"
            color="base.white.light"
            transitionDuration="300ms"
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={() => {
              if (!token) {
                router.push("/client-sign-in");
                return;
              }

              if (token && role !== "client") {
                window.open(googleCalendarLink, "_blank");
              }
            }}
            disabled={token && role !== "client"}
          >
            Book Appointment
          </Button>
        ) : (
          <>
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
                    visitType === type.name ? "base.white.light" : "transparent"
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
                    {
                      value: "checkup",
                      label: "Checkup",
                    },
                    {
                      value: "consultation",
                      label: "Consultation",
                    },
                    {
                      value: "emergency",
                      label: "Emergency",
                    },
                  ]}
                  selectedOption={visitReason}
                  setSelectedOption={setVisitReason}
                  containerProps={{
                    w: "100%",
                    h: "40px",
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
                paddingX={"40px"}
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
            <Button
              type="button"
              width={"100%"}
              h="48px"
              borderRadius="8px"
              padding="12px 18px"
              gap="6px"
              bg={submitting ? "base.white.light" : "primary.500.light"}
              border={"1px solid"}
              borderColor={"primary.500.light"}
              fontWeight="600"
              fontSize="14px"
              color="base.white.light"
              _hover={{ bg: "base.white.light", color: "primary.500.light" }}
              _active={{ bg: "base.white.light", color: "primary.500.light" }}
              onClick={handleBookAppointment}
              disabled={token && role !== "client"}
            >
              {submitting ? (
                <Spinner color="secondary.500.light" />
              ) : (
                "Book Appointment"
              )}
            </Button>
          </>
        )}
      </VStack>

      <CreateAppointmentSuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        responseData={createResponseData}
        address={address}
      />
    </>
  );
}
