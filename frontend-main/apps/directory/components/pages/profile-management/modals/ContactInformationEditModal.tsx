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
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FormPhoneInput from "@repo/ui/components/form/FormPhoneInput";
import { FormProvider, useForm } from "react-hook-form";
import { contactInformationEdditModalValidation } from "../../../../validations/providerProfileManagementValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import {
  getCities,
  getCountries,
  getStates,
  providerUpdate,
} from "@repo/ui/utils/api";
import FormInput from "@repo/ui/components/form/FormInput";
import FormTextarea from "@repo/ui/components/form/FormTextarea";
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

const ContactInformationEditModal = ({ data, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(contactInformationEdditModalValidation),
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      phoneNumber: data?.address?.phoneNumber as string,
      country: {
        id: data?.address?.country as string,
        name: data?.address?.country as string,
      },
      state: {
        id: data?.address?.state as string,
        name: data?.address?.state as string,
      },
      city: {
        id: data?.address?.city as string,
        name: data?.address?.city as string,
      },
      streetAddress: data?.address?.streetAddress as string,
      zipCode: data?.address?.zipCode.toString() as string,
    });
  }, [activeModal]);

  const onSubmit = async (formData: {
    phoneNumber: string;
    country: {
      id: string;
      name: string;
    };
    state: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
    streetAddress: string;
    zipCode: string;
    appointmentCalendarType?: { value: string; label: string };
  }) => {
    try {
      const formattedPhone = formData?.phoneNumber?.startsWith("+")
        ? formData?.phoneNumber
        : `+${formData?.phoneNumber}`;
      setIsSubmitLoading(true);
      await providerUpdate({
        phoneNumber: formattedPhone,
        country: formData?.country?.id,
        state: formData?.state?.id,
        city: formData?.city?.id,
        streetAddress: formData?.streetAddress,
        zipCode: Number(formData?.zipCode),
        appointmentCalendarType: formData?.appointmentCalendarType?.value,
      });
      await refetch();
      reset();
      showToast(
        "Success",
        "Contact information updated successfully.",
        "success"
      );
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to update contact information.", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "contactInformationEdit"}
      onClose={() => {
        setActiveModal(undefined);
      }}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent maxW={"600px"}>
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
            Edit Practice/Business Contact Information
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update the contact information for your practice or business to
            ensure it is accurate and current.
          </Text>
          <FormProvider {...methods}>
            <form>
              <FormPhoneInput
                name="phoneNumber"
                label="Phone number"
                rules={{ required: "Required" }}
                phoneInputContainerStyle={{
                  width: "100%",
                  border: "1px solid",
                  borderColor: colors.secondary["200"].light,
                }}
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  mb: "4px",
                }}
                inputStyle={{
                  border: "none",
                  height: "40px",
                }}
                buttonStyle={{
                  border: "none",
                  borderRight: "1px solid",
                  borderColor: colors.secondary["200"].light,
                }}
              />
              <Flex gap={"16px"} alignItems={"center"} my={"16px"}>
                <FormAsyncSelect
                  name={"country"}
                  label="Country"
                  placeholder="Select Country"
                  searchInputProps={{
                    color: "secondary.950.light",
                    _placeholder: { color: "grayScale.600.light" },
                  }}
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "4px",
                  }}
                  queryKey={["country"]}
                  queryFn={(option) =>
                    getCountries(
                      option?.queryKey[0] as string,
                      option?.pageParam
                    )
                  }
                />
                <FormAsyncSelect
                  name={"state"}
                  label="State/Region"
                  placeholder="Select State/Region"
                  searchInputProps={{
                    color: "secondary.950.light",
                    _placeholder: { color: "grayScale.600.light" },
                  }}
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "4px",
                  }}
                  queryKey={["state", 20]}
                  queryFn={(option) =>
                    getStates(
                      option?.queryKey[0] as string,
                      option?.pageParam,
                      option?.queryKey[2] as number,
                      233
                    )
                  }
                />
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} mb={"16px"}>
                <FormAsyncSelect
                  name={"city"}
                  label="City"
                  placeholder="Select City"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "4px",
                  }}
                  searchInputProps={{
                    color: "secondary.950.light",
                    _placeholder: { color: "grayScale.600.light" },
                  }}
                  queryKey={["city", 20]}
                  queryFn={(option) =>
                    getCities(
                      option?.queryKey[0] as string,
                      option?.pageParam,
                      option?.queryKey[2] as number,
                      1456
                    )
                  }
                />
                <FormInput
                  name={"zipCode"}
                  label="Zip Code"
                  type="number"
                  placeholder="Enter Zip Code"
                  labelProps={{
                    marginBottom: "4px",
                    fontSize: "14px",
                    color: "secondary.700.light",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    color: "secondary.950.light",
                    _placeholder: {
                      color: "#667085",
                    },
                  }}
                />
              </Flex>
              <FormTextarea
                name="streetAddress"
                label="Street Address"
                containerProps={{ width: "100%" }}
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  mb: "4px",
                }}
                textareaProps={{ rows: 6, color: "secondary.950.light" }}
                placeholder="Enter Street Address..."
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

export default ContactInformationEditModal;
