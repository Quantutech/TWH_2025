"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import KeyIcon from "@repo/ui/components/icons/KeyIcon";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordModalValidation } from "../../../../validations/providerProfileManagementValidations";
import FormInput from "@repo/ui/components/form/FormInput";
import { colors } from "@repo/ui/theme";
import { clientChangePassword } from "@repo/ui/utils/api";
import { useAuth } from "@repo/ui/components/context/AuthProvider";
import { useRouter } from "next/navigation";
import { getCookie } from "@repo/ui/utils/storage";

interface Props {
  activeModal:
    | "personalInformationEdit"
    | "emailEdit"
    | "passwordEdit"
    | undefined;
  setActiveModal: Dispatch<
    SetStateAction<
      "personalInformationEdit" | "emailEdit" | "passwordEdit" | undefined
    >
  >;
}

const ChangePasswordModal = ({ activeModal, setActiveModal }: Props) => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { logout } = useAuth();
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(changePasswordModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const role = JSON.parse(getCookie("role") as string);
    try {
      setIsSubmitLoading(true);
      await clientChangePassword({
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
      });

      showToast("Success", "Password updated successfully", "success");
      logout();
      if (role === "client") {
        router.push("/client-sign-in");
      } else {
        router.push("/provider-sign-in");
      }
      setIsSubmitLoading(false);
    } catch (error: any) {
      setIsSubmitLoading(false);
      showToast(
        "Error",
        error?.message || "Failed to update password",
        "error"
      );
    }
  };

  return (
    <Modal
      isOpen={activeModal === "passwordEdit"}
      onClose={() => {
        setActiveModal(undefined);
      }}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
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
              icon={
                <KeyIcon
                  svg={{ width: "24px", height: "24px" }}
                  path={{ fill: colors.secondary["950"].light }}
                />
              }
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
            Change Password
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your password to enhance security and protect your account.
          </Text>
          <FormProvider {...methods}>
            <form>
              <FormInput
                name={"currentPassword"}
                label={"Current Password"}
                secureText
                placeholder="Enter Current Password"
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: "8px",
                }}
              />

              <Text
                color={"secondary.950.light"}
                fontWeight={500}
                fontSize={"16px"}
                my={"16px"}
              >
                Set New Password
              </Text>

              <FormInput
                name={"newPassword"}
                label={"Create a New Password"}
                secureText
                placeholder="Enter Your New Password"
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: "8px",
                }}
                containerProps={{ mb: "16px" }}
              />

              <FormInput
                name={"repeatNewPassword"}
                label={"Repeat the New Password"}
                secureText
                placeholder="Repeat Your New Password"
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: "8px",
                }}
              />
            </form>
          </FormProvider>
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
              setActiveModal(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            bg={"primary.500.light"}
            border={"1px solid"}
            borderColor={"primary.500.light"}
            borderRadius={"8px"}
            color={"base.white.light"}
            width={"100%"}
            _hover={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            _focus={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            _active={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitLoading ? (
              <Spinner color="secondary.500.light" />
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
