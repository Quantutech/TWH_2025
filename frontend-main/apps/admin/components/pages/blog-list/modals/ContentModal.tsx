"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import HTMLContentViewer from "@repo/ui/components/HTMLContentViewer";

interface Props {
  activeModalId: number | undefined;
  setActiveModalId: Dispatch<SetStateAction<number | undefined>>;
  data: any;
}

const ContentModal = ({ activeModalId, setActiveModalId, data }: Props) => {
  return (
    <Modal
      isOpen={activeModalId === data.id}
      onClose={() => {
        setActiveModalId(undefined);
      }}
      isCentered
      closeOnEsc
      closeOnOverlayClick
    >
      <ModalOverlay />
      <ModalContent maxW={"600px"}>
        <ModalHeader overflow={"hidden"}>
          <ModalCloseButton
            color={"secondary.400.light"}
            width={"12px"}
            height={"12px"}
            padding={"16px 24px"}
            _hover={{ bg: "transparent", opacity: "0.6" }}
            _active={{ bg: "transparent", opacity: "0.6" }}
          />
        </ModalHeader>
        <ModalBody>
          <HTMLContentViewer contextUrl={data?.contextUrl} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContentModal;
