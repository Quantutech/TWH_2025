"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { getLanguages, providerUpdate } from "@repo/ui/utils/api";
import { sessionDetailsEditModalValidation } from "../../../../validations/providerProfileManagementValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  ProviderGetMeResponseData,
  ProviderProfileManagementSessionDetailsFormValues,
  ResponseData,
} from "@repo/ui/utils/type";
import FormAsyncMultiSelect from "@repo/ui/components/form/FormAsyncMultiSelect";
import FormSelect from "@repo/ui/components/form/FormSelect";
import FormCheckbox from "@repo/ui/components/form/FormCheckbox";
import FormMultiSelect from "@repo/ui/components/form/FormMultiSelect";
import { hoursOption } from "@repo/ui/constants/constant";
import { capitalizeFirstLetter, convertToAMPM } from "@repo/ui/utils/helpers";
import { colors } from "@repo/ui/theme";
import FormInput from "@repo/ui/components/form/FormInput";

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
  appointmentCalendarType:
    | {
        value: string | number;
        label: string;
        disabled?: boolean;
      }
    | undefined;
  setAppointmentCalendarType: Dispatch<
    SetStateAction<
      | {
          value: string | number;
          label: string;
          disabled?: boolean;
        }
      | undefined
    >
  >;
}

const SessionDetailsEditModal = ({
  data,
  refetch,
  appointmentCalendarType,
  setAppointmentCalendarType,
}: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const showToast = useToastNotification();
  const methods = useForm<ProviderProfileManagementSessionDetailsFormValues>({
    resolver: yupResolver(sessionDetailsEditModalValidation) as any,
    mode: "onSubmit",
  });

  const { handleSubmit, reset, control, getValues } = methods;
  useEffect(() => {
    reset({
      languages: data?.languages as { id: number; name: string }[],
      appointmentTypes: {
        inPerson: !!data?.appointmentType.find((item) => item.id === 1),
        video: !!data?.appointmentType.find((item) => item.id === 2),
        phone: !!data?.appointmentType.find((item) => item.id === 3),
        text: !!data?.appointmentType.find((item) => item.id === 4),
      },
      appointmentDurations: {
        "15min": false,
        "30min": true,
        "45min": false,
        "60min": false,
      },
      availabilityHours: {
        from: {
          value: data?.providerAvailability?.[0]?.startTime
            ? convertToAMPM(
                data?.providerAvailability?.[0]?.startTime as string
              )
            : "12:00 AM",
          label: data?.providerAvailability?.[0]?.startTime
            ? convertToAMPM(
                data?.providerAvailability?.[0]?.startTime as string
              )
            : "12:00 AM",
        },
        to: {
          value: data?.providerAvailability?.[0]?.endTime
            ? convertToAMPM(data?.providerAvailability?.[0]?.endTime as string)
            : "12:30 AM",
          label: data?.providerAvailability?.[0]?.endTime
            ? convertToAMPM(data?.providerAvailability?.[0]?.endTime as string)
            : "12:30 AM",
        },
      },
      availabilityDays: data?.providerAvailability?.map((item) => ({
        value: item.dayOfWeek.toLowerCase(),
        label: item.dayOfWeek,
      })) as [],
      externalAppointmentUrl: data?.externalAppointmentUrl ?? "",
      appointmentCalendarType: {
        value: data?.appointmentCalendarType,
        label: capitalizeFirstLetter(
          data?.appointmentCalendarType?.replaceAll("_", " ")
        ),
      },
    });
  }, [activeModal]);

  const fromValue = useWatch({ control, name: "availabilityHours.from" });
  const toValue = useWatch({ control, name: "availabilityHours.to" });

  const hoursOptionForFrom = hoursOption.map((option) => ({
    ...option,
    disabled: toValue?.value === option.value,
  }));

  const hoursOptionForTo = hoursOption.map((option) => ({
    ...option,
    disabled: fromValue?.value === option.value,
  }));

  useEffect(() => {
    const appointmentCalendarType = getValues("appointmentCalendarType");
    setAppointmentCalendarType(appointmentCalendarType);
  }, [activeModal]);

  const onSubmit = async (
    formData: ProviderProfileManagementSessionDetailsFormValues
  ) => {
    try {
      setIsSubmitLoading(true);

      if (appointmentCalendarType?.value === "our_system") {
        await providerUpdate({
          languages: formData?.languages?.map((item) => item?.id),
          appointmentTypes: [
            formData?.appointmentTypes?.inPerson ? 1 : null,
            formData?.appointmentTypes?.video ? 2 : null,
            formData?.appointmentTypes?.phone ? 3 : null,
            formData?.appointmentTypes?.text ? 4 : null,
          ].filter((val): val is number => val !== null),
          workingHours: formData?.availabilityDays?.map((item) => ({
            dayOfWeek: item.value,
            startTime: formData?.availabilityHours?.from?.value as string,
            endTime: formData?.availabilityHours?.to?.value as string,
          })),
          appointmentCalendarType: formData?.appointmentCalendarType?.value,
        });
      } else if (appointmentCalendarType?.value === "external") {
        await providerUpdate({
          externalAppointmentUrl: formData?.externalAppointmentUrl ?? "",
          appointmentCalendarType: formData?.appointmentCalendarType?.value,
        });
      }

      await refetch();
      reset();
      showToast("Success", "Session details updated successfully.", "success");
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to update session details.", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "sessionDetailsEdit"}
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
            Edit Profile and Session Details
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your profile and session details to provide accurate
            information to clients.
          </Text>

          <FormProvider {...methods}>
            <FormSelect
              name="appointmentCalendarType"
              label="Appointment Calendar Type"
              placeholder="Select Appointment Calendar Type"
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
              options={[
                { label: "Our System", value: "our_system" },
                { label: "External Calendar URL", value: "external" },
              ]}
              containerProps={{ mb: "16px" }}
              onOptionClick={(option) => {
                setAppointmentCalendarType(option);
              }}
            />
            {appointmentCalendarType?.value === "our_system" ? (
              <>
                <FormAsyncMultiSelect
                  name={"languages"}
                  rules={{ required: "Required" }}
                  placeholder="Select Languages Spoken (up to 6)"
                  queryKey={["languages"]}
                  queryFn={() => getLanguages()}
                  label="Languages Spoken"
                  defaultValue={data?.languages}
                />
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={"secondary.950.light"}
                  mt={"16px"}
                >
                  Appointment Types Offered
                </Text>
                <Flex gap={"12px"} justifyContent={"flex-start"}>
                  <FormCheckbox
                    name={"appointmentTypes.inPerson"}
                    formControlProps={{ style: { maxWidth: "90px" } }}
                    label="In-Person"
                  />
                  <FormCheckbox
                    name={"appointmentTypes.video"}
                    formControlProps={{ style: { maxWidth: "64px" } }}
                    label="Video"
                  />
                  <FormCheckbox
                    name={"appointmentTypes.phone"}
                    formControlProps={{ style: { maxWidth: "64px" } }}
                    label="Phone"
                  />
                  <FormCheckbox
                    name={"appointmentTypes.text"}
                    label="Text/Chat"
                  />
                </Flex>
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={"secondary.950.light"}
                  mt={"16px"}
                >
                  Appointment Duration Options
                </Text>
                <Flex gap={"12px"}>
                  <FormCheckbox
                    name={"appointmentDurations.15min"}
                    disabled
                    formControlProps={{ style: { maxWidth: "70px" } }}
                    label="15 Min"
                  />
                  <FormCheckbox
                    name={"appointmentDurations.30min"}
                    disabled
                    formControlProps={{ style: { maxWidth: "70px" } }}
                    label="30 Min"
                  />
                  <FormCheckbox
                    name={"appointmentDurations.45min"}
                    disabled
                    formControlProps={{ style: { maxWidth: "70px" } }}
                    label="45 Min"
                  />
                  <FormCheckbox
                    name={"appointmentDurations.60min"}
                    disabled
                    formControlProps={{ style: { maxWidth: "70px" } }}
                    label="60 Min"
                  />
                </Flex>
                <FormMultiSelect
                  name={"availabilityDays"}
                  label="Availability Days"
                  containerProps={{ width: "100%", mt: "16px" }}
                  placeholder="Select Availability Days"
                  defaultValue={data?.providerAvailability.map((item) => {
                    return {
                      value: item.dayOfWeek.toLowerCase(),
                      label: item.dayOfWeek,
                    };
                  })}
                  options={[
                    { value: "monday", label: "Monday" },
                    { value: "tuesday", label: "Tuesday" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "thursday", label: "Thursday" },
                    { value: "friday", label: "Friday" },
                    { value: "saturday", label: "Saturday" },
                    { value: "sunday", label: "Sunday" },
                  ]}
                />
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={"secondary.950.light"}
                  mt={"16px"}
                >
                  Availability Hours
                </Text>
                <Flex gap={"16px"}>
                  <FormSelect
                    name={"availabilityHours.from"}
                    options={hoursOptionForFrom}
                    label="From"
                    searchInputProps={{
                      color: "secondary.950.light",
                      _placeholder: { color: "grayScale.600.light" },
                    }}
                  />
                  <FormSelect
                    name={"availabilityHours.to"}
                    options={hoursOptionForTo}
                    label="To"
                    searchInputProps={{
                      color: "secondary.950.light",
                      _placeholder: { color: "grayScale.600.light" },
                    }}
                  />
                </Flex>
              </>
            ) : appointmentCalendarType?.value === "external" ? (
              <FormInput
                name="externalAppointmentUrl"
                label="External Calendar URL"
                placeholder="Enter External Calendar URL"
                labelProps={{
                  marginBottom: "4px",
                  fontSize: "14px",
                  color: "secondary.700.light",
                }}
                inputProps={{
                  border: "1px solid",
                  borderColor: "secondary.200.light",
                  color: "#101828",
                  _placeholder: { color: "#667085" },
                }}
              />
            ) : null}
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

export default SessionDetailsEditModal;
