"use client";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import NotificationIcon from "@repo/ui/components/icons/NotificationIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { sendReminder } from "@repo/ui/utils/api";
import {
  AppointmentActiveUpcomingAction,
  AppointmentsListResponseData,
} from "@repo/ui/utils/type";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  activeUpcomingAction: AppointmentActiveUpcomingAction;
  setActiveUpcomingAction: Dispatch<
    SetStateAction<AppointmentActiveUpcomingAction>
  >;
  clickedRowData: AppointmentsListResponseData | undefined;
}

const SendReminderModal = ({
  activeUpcomingAction,
  setActiveUpcomingAction,
  clickedRowData,
}: Props) => {
  const showToast = useToastNotification();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const { mutate: triggerSendReminder } = useMutation({
    mutationFn: ({
      appointmentId,
      data,
    }: {
      appointmentId: string;
      data: { title: string; message: string };
    }) => sendReminder(appointmentId, data),
    onSuccess: () => {
      showToast("Reminder sent successfully", "success");
      setActiveUpcomingAction(undefined);
    },
    onError: () => {
      showToast("Failed to send reminder", "error");
    },
  });

  const handleSendReminder = () => {
    const isTitleEmpty = title.trim() === "";
    const isMessageEmpty = message.trim() === "";

    setTitleError(isTitleEmpty);
    setMessageError(isMessageEmpty);

    if (isTitleEmpty || isMessageEmpty || !clickedRowData?.id) return;

    triggerSendReminder({
      appointmentId: clickedRowData.id.toString(),
      data: { title, message },
    });
  };

  return (
    <Modal
      isOpen={activeUpcomingAction === "sendReminder"}
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
              icon={
                <NotificationIcon svg={{ width: "24px", height: "24px" }} />
              }
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
            Send Reminder
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Please review the reminder details and make any necessary changes
            before sending it to the client.
          </Text>
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.700.light"}
              fontWeight={500}
              fontSize={"14px"}
            >
              Title
            </Text>
            <Input
              type="text"
              border={"1px solid"}
              borderColor={titleError ? "red.400" : "secondary.200.light"}
              borderRadius={"8px"}
              color={"#101828"}
              fontSize={"16px"}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError(false);
              }}
            />
            {titleError && (
              <Text color="red.500" fontSize="12px" mt="2px">
                This field is required
              </Text>
            )}
          </Flex>
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.700.light"}
              fontWeight={500}
              fontSize={"14px"}
            >
              Message
            </Text>
            <Textarea
              border={"1px solid"}
              borderColor={messageError ? "red.400" : "secondary.200.light"}
              borderRadius={"8px"}
              color={"#101828"}
              fontSize={"16px"}
              onChange={(e) => {
                setMessage(e.target.value);
                if (messageError) setMessageError(false);
              }}
            />
            {messageError && (
              <Text color="red.500" fontSize="12px" mt="2px">
                This field is required
              </Text>
            )}
          </Flex>
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
              setActiveUpcomingAction(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendReminder}
            type="button"
            bg={"primary.500.light"}
            border={"1px solid"}
            borderColor={"error.100.light"}
            borderRadius={"8px"}
            color={"base.white.light"}
            width={"100%"}
            _hover={{ bg: undefined }}
            _focus={{ bg: undefined }}
            _active={{ bg: undefined }}
          >
            Send Reminder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendReminderModal;
