import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import AngleUpIcon from "@repo/ui/components/icons/AngleUpIcon";
import RoundedSuccessDateIcon from "@repo/ui/components/icons/RoundedSuccessDateIcon";
import {
  formatDateTimeToReadable,
  formatDateToReadable,
} from "@repo/ui/utils/helpers";
import CloseIcon from "@repo/ui/components/icons/CloseIcon";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  responseData: any;
  address: any;
}

const CreateAppointmentSuccessModal = ({
  isOpen,
  setIsOpen,
  responseData,
  address,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="16px">
        <ModalHeader
          bg={"base.white.light"}
          overflow={"hidden"}
          borderTopLeftRadius={"16px"}
          borderTopRightRadius={"16px"}
          boxShadow="0px 6px 24px 0px #18273414"
        >
          <Flex alignItems={"center"}>
            <Text width={"100%"} textAlign={"center"}>
              Success
            </Text>
            <CloseIcon
              svg={{
                width: "22px",
                height: "22px",
                cursor: "pointer",
                onClick: () => setIsOpen(false),
              }}
            />
          </Flex>
        </ModalHeader>
        <ModalBody>
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
                {responseData?.data?.id || "-"}
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
                  {formatDateToReadable(responseData?.data?.slotTime)}
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
                  {formatDateTimeToReadable(responseData?.data?.slotTime)}
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
                  {address.streetAddress || ""},{address.city || ""},{" "}
                  {address.zipCode || ""}, {address.country || ""}
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
              _disabled={{ opacity: 1 }}
              onClick={() => {}}
            >
              View Appointments
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateAppointmentSuccessModal;
