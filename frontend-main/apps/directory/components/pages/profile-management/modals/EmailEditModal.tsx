"use client";
import React, { useEffect, useState } from "react";
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
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import EmailIcon from "@repo/ui/components/icons/EmailIcon";
import { FormProvider, useForm } from "react-hook-form";
import { emailEditModalValidation } from "../../../../validations/providerProfileManagementValidations";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@repo/ui/components/form/FormInput";
import { colors } from "@repo/ui/theme";
import DigitInput from "@repo/ui/components/elements/DigitInput";
import {
  providerConfirmEmailChange,
  providerRequestEmailChange,
} from "@repo/ui/utils/api";

interface Props {
  data: ProviderGetMeResponseData | undefined;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | ResponseData<ProviderGetMeResponseData>
      | {
          data: undefined;
          success: false;
        },
      Error
    >
  >;
}

const EmailEditModal = ({ data, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string | undefined>(undefined);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const [step, setStep] = useState(0);
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(emailEditModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({ email: data?.email as string });
  }, [activeModal]);

  const onSubmit = async (data: any) => {
    if (step === 0) {
      await providerRequestEmailChange();
      setStep(1);
      return;
    }
    try {
      setIsSubmitLoading(true);
      await providerConfirmEmailChange({
        newEmail: data.email,
        verificationCode: codeValue as string,
      });
      showToast("Success", "Email updated successfully", "success");
      refetch();
      setIsSubmitLoading(false);
      setStep(0);
      setActiveModal(undefined);
    } catch (error: any) {
      setIsSubmitLoading(false);

      showToast("Error", error?.message || "Failed to update email", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "emailEdit"}
      onClose={() => {
        reset();
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
                <EmailIcon
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
            {step === 0 ? "Edit Email" : "Please Check Your Email."}
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            {step === 0
              ? "Update your email address to keep your contact information current."
              : `We’ve sent a code to ${methods?.getValues("email")}.`}
          </Text>
          <FormProvider {...methods}>
            <form>
              {step === 0 ? (
                <>
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                  <Text color={"#475467"} fontWeight={"400"} fontSize={"14px"}>
                    To register this email, you need to verify it.
                  </Text>
                </>
              ) : (
                <>
                  <Flex gap={"6px"}>
                    <DigitInput
                      onChange={(value) => {
                        setCodeValue(value);
                      }}
                    />
                  </Flex>
                  <Flex gap={"2px"} mt={"8px"}>
                    <Text
                      fontWeight={400}
                      color={"primary.600.light"}
                      fontSize={"14px"}
                    >
                      Didn’t get a code?
                    </Text>
                    <Text
                      textDecor={"underline"}
                      fontWeight={600}
                      color={"primary.600.light"}
                      fontSize={"14px"}
                      cursor={"pointer"}
                      onClick={async () => {
                        try {
                          setIsSubmitLoading(true);
                          await providerRequestEmailChange();
                          showToast(
                            "Success",
                            "Email sent, please check your inbox.",
                            "success"
                          );
                          setIsSubmitLoading(false);
                        } catch (error: any) {
                          setIsSubmitLoading(false);
                          showToast(
                            "Error",
                            error?.message || "Failed to update email",
                            "error"
                          );
                        }
                      }}
                    >
                      Click to resend
                    </Text>
                  </Flex>
                </>
              )}
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
              if (step === 1) {
                setStep(0);
                return;
              }
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

export default EmailEditModal;
