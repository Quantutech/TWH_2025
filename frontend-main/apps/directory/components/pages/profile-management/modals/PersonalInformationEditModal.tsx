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
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInformationEditModalValidation } from "../../../../validations/providerProfileManagementValidations";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { providerUpdate } from "@repo/ui/utils/api";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { colors } from "@repo/ui/theme";

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

const PersonalInformationEditModal = ({ data, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(personalInformationEditModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      firstName: data?.firstName as string,
      middleName: data?.middleName,
      lastName: data?.lastName as string,
    });
  }, [activeModal]);

  const onSubmit = async (data: {
    firstName: string;
    middleName?: string | null;
    lastName: string;
  }) => {
    try {
      setIsSubmitLoading(true);
      await providerUpdate({
        firstName: data?.firstName,
        middleName: data?.middleName as string | undefined,
        lastName: data?.lastName,
      });
      showToast(
        "Success",
        "Personal information updated successfully",
        "success"
      );
      reset();
      refetch();
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to update personal information", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "personalInformationEdit"}
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
                <UnderlineEditIcon
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
            Edit Personal Information
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your personal information to ensure accurate and up-to-date
            records.
          </Text>
          <FormProvider {...methods}>
            <form>
              <FormInput
                name={"firstName"}
                placeholder="First Name"
                label="First Name"
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: "8px",
                }}
              />
              <FormInput
                name={"middleName"}
                placeholder="Middle Name"
                label="Middle Name"
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: "8px",
                }}
                containerProps={{ my: "16px" }}
              />
              <FormInput
                name={"lastName"}
                placeholder="Last Name"
                label="Last Name"
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
              reset();
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

export default PersonalInformationEditModal;
