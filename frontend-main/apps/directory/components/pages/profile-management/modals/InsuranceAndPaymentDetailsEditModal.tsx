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
import FormInput from "@repo/ui/components/form/FormInput";
import FormSelect from "@repo/ui/components/form/FormSelect";
import { getInsurances, providerUpdate } from "@repo/ui/utils/api";
import { FormProvider, useForm } from "react-hook-form";
import FormAsyncMultiSelect from "@repo/ui/components/form/FormAsyncMultiSelect";
import CustomSwitch from "@repo/ui/components/elements/CustomSwitch";
import { insuranceAndPaymnetDetailsEditModalValidation } from "../../../../validations/providerProfileManagementValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
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

const InsuranceAndPaymentDetailsEditModal = ({ data, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(insuranceAndPaymnetDetailsEditModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      insurances: data?.insurances as any[],
      paymentMethodsAccepted: [] as any[] | null | undefined,
      pricingBasedOnDurationPer15Min: 0 as number,
      minimumFee: data?.minFee as number,
      MaximumFee: data?.maxFee as number,
    });
  }, [activeModal]);

  const onSubmit = async (formData: {
    insurances: any[];
    paymentMethodsAccepted?: any[] | null | undefined;
    pricingBasedOnDurationPer15Min: number;
    minimumFee: number;
    MaximumFee: number;
  }) => {
    try {
      setIsSubmitLoading(true);
      await providerUpdate({
        insurances: formData?.insurances?.map((item) => item?.id),
        minFee: formData?.minimumFee?.toString(),
        maxFee: formData?.MaximumFee?.toString(),
      });
      await refetch();
      reset();
      showToast(
        "Success",
        "Insurance And Payment details updated successfully.",
        "success"
      );
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast(
        "Error",
        "Failed to update insurance and payment details.",
        "error"
      );
    }
  };

  return (
    <Modal
      isOpen={activeModal === "insuranceAndPaymentDetailsEdit"}
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
            Edit Insurance and Payment Details
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your insurance and payment details to ensure accurate billing
            and client transactions.
          </Text>
          <FormProvider {...methods}>
            <form>
              <FormAsyncMultiSelect
                name={"insurances"}
                placeholder="Select Insurance Accepted"
                queryKey={["insurances", 20]}
                searchInputProps={{
                  color: "secondary.950.light",
                  _placeholder: { color: "grayScale.600.light" },
                }}
                defaultValue={data?.insurances}
                queryFn={(option) =>
                  getInsurances(
                    option?.queryKey[0] as string,
                    option?.pageParam,
                    option?.queryKey[2] as number
                  )
                }
                label="Insurance Accepted"
              />
              <FormSelect
                name={"paymentMethodsAccepted"}
                options={[{ value: "cash", label: "Cash" }]}
                placeholder="Select Payment Methods Accepted (up to 6)"
                containerProps={{ my: "16px" }}
                label="Payment Methods Accepted"
                searchInputProps={{
                  color: "secondary.950.light",
                  _placeholder: { color: "grayScale.600.light" },
                }}
                disabled
              />
              <FormInput
                name={"pricingBasedOnDurationPer15Min"}
                label="Pricing based on Duration Per 15 Min"
                placeholder="Enter Pricing based on Duration Per 15 Min"
                type="number"
                labelProps={{
                  marginBottom: "4px",
                  fontSize: "14px",
                  color: "secondary.700.light",
                }}
                inputProps={{
                  border: "1px solid",
                  borderColor: "secondary.200.light",
                  color: "#101828",
                  _placeholder: {
                    color: "#667085",
                  },
                }}
              />
              <Flex alignItems={"center"} gap={"8px"} mt={"16px"}>
                <CustomSwitch onChange={undefined} isChecked={false} />
                <Text
                  fontSize={"16px"}
                  fontWeight={600}
                  color={"secondary.950.light"}
                >
                  Sliding Scale Availability
                </Text>
              </Flex>
              <Flex gap={"16px"} my={"16px"}>
                <FormInput
                  name={"minimumFee"}
                  label="Minimum Fee"
                  placeholder="Enter Minimum Fee"
                  type="number"
                  labelProps={{
                    marginBottom: "4px",
                    fontSize: "14px",
                    color: "secondary.700.light",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    color: "#101828",
                    _placeholder: {
                      color: "#667085",
                    },
                  }}
                />
                <FormInput
                  name={"MaximumFee"}
                  label="Minimum Fee"
                  placeholder="Enter Maximum Fee"
                  type="number"
                  labelProps={{
                    marginBottom: "4px",
                    fontSize: "14px",
                    color: "secondary.700.light",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    color: "#101828",
                    _placeholder: {
                      color: "#667085",
                    },
                  }}
                />
              </Flex>
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

export default InsuranceAndPaymentDetailsEditModal;
