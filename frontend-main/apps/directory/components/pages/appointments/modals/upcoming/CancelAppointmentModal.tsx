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
import CustomSelect from "@repo/ui/components/elements/CustomSelect";
import CancelDateIcon from "@repo/ui/components/icons/CancelDateIcon";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { cancelAppointment } from "@repo/ui/utils/api";
import {
  AppointmentActiveUpcomingAction,
  AppointmentsListResponseData,
  CustomSelectOption,
} from "@repo/ui/utils/type";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  activeUpcomingAction: AppointmentActiveUpcomingAction;
  setActiveUpcomingAction: Dispatch<
    SetStateAction<AppointmentActiveUpcomingAction>
  >;
  clickedRowData: AppointmentsListResponseData | undefined;
}

const CancelAppointmentModal = ({
  activeUpcomingAction,
  setActiveUpcomingAction,
  clickedRowData,
}: Props) => {
  const showToast = useToastNotification();
  const [cancelReason, setCancelReason] = useState<CustomSelectOption>();
  const queryClient = useQueryClient();

  const handleCancelApptClick = async () => {
    try {
      const payload = {
        appointmentId: clickedRowData?.id,
        reason: cancelReason?.value,
      };
      await cancelAppointment(payload);
      queryClient.refetchQueries({ queryKey: ["appointments-list"] });
      showToast("Success", "Appointment successfully canceled", "success");
      setCancelReason(undefined);
      setActiveUpcomingAction(undefined);
    } catch (error) {
      showToast("Error", "Failed to cancel the appointment", "error");
    }
  };

  return (
    <Modal
      isOpen={activeUpcomingAction === "cancelAppointment"}
      onClose={() => {
        setActiveUpcomingAction(undefined);
        setCancelReason(undefined);
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={"400px"}>
        <ModalHeader overflow={"hidden"}>
          <Flex
            zIndex={-1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <MultiRadiusIcon
              containerProps={{ marginLeft: "-124px", marginTop: "-116px" }}
              icon={<CancelDateIcon svg={{ width: "24px", height: "24px" }} />}
              outLineColor={"#EAECF0"}
            />
            <ModalCloseButton
              mt={"22px"}
              mr={"12px"}
              color={"secondary.400.light"}
              width={"12px"}
              height={"12px"}
              padding={"16px 24px"}
              _hover={{ bg: "transparent", opacity: "0.6" }}
              _active={{ bg: "transparent", opacity: "0.6" }}
            />
          </Flex>
        </ModalHeader>
        <ModalBody mt={"-130px"}>
          <Text
            color={"secondary.950.light"}
            fontWeight={600}
            fontSize={"18px"}
            mt={"16px"}
          >
            Cancel Appointment
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
          </Text>
          <CustomSelect
            label="Cancel Reason"
            placeholder="Select Cancel Reason"
            options={[
              { value: "Scheduling Conflict", label: "Scheduling Conflict" },
              { value: "Technical Issues", label: "Technical Issues" },
              { value: "Other", label: "Other" },
            ]}
            selectedOption={cancelReason}
            setSelectedOption={setCancelReason}
          />
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap={"16px"}>
          <Button
            type="button"
            bg={"base.white.light"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            borderRadius={"8px"}
            color={"secondary.900.light"}
            width={"100%"}
            _hover={{ bg: undefined }}
            _focus={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={() => {
              setCancelReason(undefined);
              setActiveUpcomingAction(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            bg={"error.600.light"}
            border={"1px solid"}
            borderColor={"error.100.light"}
            borderRadius={"8px"}
            color={"base.white.light"}
            width={"100%"}
            _hover={{ bg: undefined }}
            _focus={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={handleCancelApptClick}
            isDisabled={!cancelReason}
          >
            Cancel Appt.
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelAppointmentModal;
