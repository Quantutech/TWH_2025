"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import logoImage from "@repo/ui/assets/logo.webp";

interface Props {
  modalOption: {
    isOpen: boolean;
    data:
      | {
          name: string;
          professionalTitle: string;
          shortBio: string;
          description: string;
          imageUrl: string;
          instagramUrl: string;
          linkedinUrl: string;
          websiteUrl?: string;
        }
      | undefined;
  };
  setModalOption: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      data:
        | {
            name: string;
            professionalTitle: string;
            shortBio: string;
            description: string;
            imageUrl: string;
            instagramUrl: string;
            linkedinUrl: string;
            websiteUrl?: string;
          }
        | undefined;
    }>
  >;
}

const EmailEditModal = ({ modalOption, setModalOption }: Props) => {
  return (
    <Modal
      isOpen={modalOption?.isOpen}
      onClose={() => {
        setModalOption({ isOpen: false, data: undefined });
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={"960px"}>
        <ModalHeader
          display={{ base: "block", lg: "none" }}
          p={"24px 24px 0px 24px"}
        >
          <Flex
            justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
          >
            <Image
              src={logoImage.src}
              alt={modalOption?.data?.name}
              maxW={"210px"}
            />
            <ModalCloseButton
              display={{ base: "flex", lg: "none" }}
              position={"static"}
              color={"secondary.900.light"}
              width={"12px"}
              height={"12px"}
              border={"1px solid"}
              borderColor={"grayScale.200.light"}
              padding={"16px"}
              _hover={{ bg: "transparent", opacity: "0.6" }}
              _active={{ bg: "transparent", opacity: "0.6" }}
            />
          </Flex>
        </ModalHeader>
        <ModalBody padding={"24px"}>
          <Flex gap={"16px"} flexDirection={{ base: "column", lg: "row" }}>
            <Image
              width={{ base: "100%", lg: "460px" }}
              maxW={{ base: "100%", lg: "460px" }}
              minW={{ base: "100%", lg: "460px" }}
              src={modalOption?.data?.imageUrl}
              alt={modalOption?.data?.name}
            />
            <Flex flexDirection={"column"} gap={"16px"}>
              <Flex
                borderBottom={"1px solid"}
                pb={"16px"}
                borderColor={"secondary.200.light"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
              >
                <Flex flexDirection={"column"}>
                  <Text
                    fontWeight={"600"}
                    fontSize={"24px"}
                    color={"secondary.950.light"}
                  >
                    {modalOption?.data?.name}
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={"18px"}
                    color={"primary.500.light"}
                  >
                    {modalOption?.data?.professionalTitle}
                  </Text>
                </Flex>
                <ModalCloseButton
                  display={{ base: "none", lg: "flex" }}
                  position={"static"}
                  color={"secondary.900.light"}
                  width={"12px"}
                  height={"12px"}
                  border={"1px solid"}
                  borderColor={"grayScale.200.light"}
                  padding={"16px"}
                  _hover={{ bg: "transparent", opacity: "0.6" }}
                  _active={{ bg: "transparent", opacity: "0.6" }}
                />
              </Flex>
              <Text
                fontSize={"18px"}
                fontWeight={"400"}
                color={"secondary.600.light"}
              >
                {modalOption?.data?.description}
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EmailEditModal;
