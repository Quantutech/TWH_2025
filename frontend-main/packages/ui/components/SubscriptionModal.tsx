"use client";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import PricingPlans from "../../../apps/landing/components/provider-benefits/pricing-plans/PricingPlans";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalCloseButton />
        <ModalBody p="0">
          <PricingPlans />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionModal;
