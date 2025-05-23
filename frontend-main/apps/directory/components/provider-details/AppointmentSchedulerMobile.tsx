"use client";
import { useEffect, useState } from "react";
import { Button, Text, Flex, Link } from "@chakra-ui/react";
import { getAppointmentDate } from "@repo/ui/utils/api";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@repo/ui/utils/storage";
import BookAppointmentModal from "./modals/BookAppointmentModal";
import { getFormattedDateTime } from "@repo/ui/utils/helpers";
import { useRouter } from "next/navigation";

interface AppointmentSchedulerProps {
  providerId?: number;
  insurance: any;
  appointmentCalendarType: any;
  providerAvailability: any;
  googleCalendarLink: string;
  nextAvailable: string;
  data: ResponseData<ProviderGetMeResponseData> | undefined;
}

export default function AppointmentSchedulerMobile({
  providerId,
  insurance,
  appointmentCalendarType,
  providerAvailability,
  googleCalendarLink,
  nextAvailable,
  data,
}: AppointmentSchedulerProps) {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<boolean | undefined>(undefined);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

  const {
    data: providerAppointment,
    isLoading: isLoadingAppointment,
    refetch: refetchAppointments,
  } = useQuery({
    queryKey: ["providerAppointment", providerId],
    queryFn: (options) =>
      getAppointmentDate({
        providerId: options.queryKey[1] as number,
      }),
    enabled: !!providerId,
  });

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

  return (
    <Flex
      position={"fixed"}
      bottom={0}
      left={0}
      right={0}
      padding={"16px 16px 32px 16px"}
      height={"100px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"base.white.light"}
    >
      {appointmentCalendarType === "our_system" ? (
        <>
          <Flex flexDirection={"column"} alignItems={"flex-start"}>
            <Text
              color={"secondary.500.light"}
              fontWeight={400}
              fontSize={"12px"}
              whiteSpace={"nowrap"}
            >
              Next Available:
            </Text>
            <Text
              color={"secondary.800.light"}
              fontWeight={"500"}
              fontSize={"14px"}
              whiteSpace={"nowrap"}
            >
              {nextAvailable ? getFormattedDateTime(nextAvailable) : "-"}
            </Text>
          </Flex>
          <Button
            type="button"
            width={"240px"}
            h="48px"
            borderRadius="8px"
            padding="12px 18px"
            gap="6px"
            bg="primary.500.light"
            fontWeight="600"
            fontSize="14px"
            color="base.white.light"
            border={"1px solid"}
            borderColor={"primary.500.light"}
            textAlign={"center"}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={() => {
              if (!token) {
                router.push("/client-sign-in");
                return;
              }
              if (token && role === "client") {
                setIsBookAppointmentModalOpen((prev) => !prev);
              }
            }}
            disabled={token && role !== "client"}
          >
            Book Appointment
          </Button>
        </>
      ) : (
        <Button
          type="button"
          width={"100%"}
          h="48px"
          borderRadius="8px"
          padding="12px 18px"
          gap="6px"
          bg="primary.500.light"
          fontWeight="600"
          fontSize="14px"
          color="base.white.light"
          border={"1px solid"}
          borderColor={"primary.500.light"}
          textAlign={"center"}
          _hover={{ bg: "base.white.light", color: "primary.500.light" }}
          _active={{ bg: "base.white.light", color: "primary.500.light" }}
          onClick={() => {
            if (!token) {
              router.push("/client-sign-in");
              return;
            }
            if (token && role === "client") {
              window.open(googleCalendarLink, "_blank");
            }
          }}
          disabled={token && role !== "client"}
        >
          Book Appointment
        </Button>
      )}

      <BookAppointmentModal
        isOpen={isBookAppointmentModalOpen}
        setIsOpen={setIsBookAppointmentModalOpen}
        providerId={providerId}
        refetchAppointments={refetchAppointments}
        insurance={insurance}
        providerAvailability={providerAvailability}
        providerAppointment={providerAppointment}
        data={data}
      />
    </Flex>
  );
}
