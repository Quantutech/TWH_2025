"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CustomSwitch from "@repo/ui/components/elements/CustomSwitch";
import FormAsyncMultiSelect from "@repo/ui/components/form/FormAsyncMultiSelect";
import FormCheckbox from "@repo/ui/components/form/FormCheckbox";
import FormInput from "@repo/ui/components/form/FormInput";
import FormMultiSelect from "@repo/ui/components/form/FormMultiSelect";
import FormSelect from "@repo/ui/components/form/FormSelect";
import { hoursOption } from "@repo/ui/constants/constant";
import { getInsurances, getLanguages } from "@repo/ui/utils/api";
import { Dispatch, SetStateAction } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import StatusTab from "./StatusTab";

interface Props {
  activeStep: number | undefined;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
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

const SessionAndInsurance = ({
  activeStep,
  setActiveStep,
  appointmentCalendarType,
  setAppointmentCalendarType,
}: Props) => {
  const { control, clearErrors } = useFormContext();
  const fromValue = useWatch({ control, name: "availabilityHoursFrom" });
  const toValue = useWatch({ control, name: "availabilityHoursTo" });

  const hoursOptionForFrom = hoursOption.map((option) => ({
    ...option,
    disabled: toValue?.value === option.value,
  }));

  const hoursOptionForTo = hoursOption.map((option) => ({
    ...option,
    disabled: fromValue?.value === option.value,
  }));

  return (
    <>
      <StatusTab activeStep={activeStep} />
      <Box
        bg="base.white.light"
        border="1px solid"
        borderColor="secondary.100.light"
        borderRadius="16px"
        mt="24px"
        p="16px 24px"
      >
        <Text
          fontWeight={600}
          fontSize="20px"
          color="grayScale.950.light"
          mb="24px"
        >
          Profile and Session Details
        </Text>

        <FormSelect
          name="appointmentCalendarType"
          label="Appointment Calendar Type"
          placeholder="Select Appointment Calendar Type"
          options={[
            { label: "Our System", value: "our_system" },
            { label: "External Calendar URL", value: "external" },
          ]}
          onOptionClick={(option) => {
            setAppointmentCalendarType(option);
          }}
        />

        {appointmentCalendarType?.value === "our_system" ? (
          <>
            <Flex gap="16px" mt="16px">
              <FormAsyncMultiSelect
                name="languages"
                rules={{ required: "Required" }}
                placeholder="Select Languages Spoken (up to 6)"
                queryKey={["languages"]}
                queryFn={() => getLanguages()}
                label="Languages Spoken"
              />
              <FormMultiSelect
                name="availabilityDays"
                label="Availability Days"
                containerProps={{ width: "100%" }}
                placeholder="Select Availability Days"
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
            </Flex>
            <Text
              fontWeight={600}
              fontSize="16px"
              color="secondary.950.light"
              mt="16px"
            >
              Appointment Types Offered
            </Text>
            <Flex gap="12px">
              <FormCheckbox
                name="appointmentTypes.inPerson"
                label="In-Person"
              />
              <FormCheckbox name="appointmentTypes.video" label="Video" />
              <FormCheckbox name="appointmentTypes.phone" label="Phone" />
              <FormCheckbox name="appointmentTypes.text" label="Text/Chat" />
            </Flex>

            <Text
              fontWeight={600}
              fontSize="16px"
              color="secondary.950.light"
              mt="16px"
            >
              Appointment Duration Options
            </Text>
            <Flex gap="12px">
              <FormCheckbox
                name="appointmentDurations.15min"
                label="15 Min"
                disabled
              />
              <FormCheckbox
                name="appointmentDurations.30min"
                label="30 Min"
                disabled
              />
              <FormCheckbox
                name="appointmentDurations.45min"
                label="45 Min"
                disabled
              />
              <FormCheckbox
                name="appointmentDurations.60min"
                label="60 Min"
                disabled
              />
            </Flex>

            <Text
              fontWeight={600}
              fontSize="16px"
              color="secondary.950.light"
              mt="16px"
            >
              Availability Hours
            </Text>
            <Flex gap="16px">
              <FormSelect
                name="availabilityHoursFrom"
                options={hoursOptionForFrom}
                label="From"
                placeholder="Enter from hours"
              />
              <FormSelect
                name="availabilityHoursTo"
                options={hoursOptionForTo}
                label="To"
                placeholder="Enter to hours"
              />
            </Flex>
          </>
        ) : appointmentCalendarType?.value === "external" ? (
          <FormInput
            name="externalAppointmentUrl"
            label="External Calendar URL"
            placeholder="Enter External Calendar URL"
            containerProps={{ mt: "16px" }}
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
        ) : (
          <></>
        )}

        <Box h="1px" bg="secondary.100.light" my="24px" />

        <Text
          fontWeight={600}
          fontSize="20px"
          color="grayScale.950.light"
          mb="24px"
        >
          Insurance and Payment Details
        </Text>

        <FormAsyncMultiSelect
          name="insurances"
          placeholder="Select Insurance Accepted"
          queryKey={["insurances", 20]}
          queryFn={(option) =>
            getInsurances(
              option?.queryKey[0] as string,
              option?.pageParam,
              option?.queryKey[2] as number
            )
          }
          label="Insurance Accepted"
        />

        <Flex gap="16px" my="16px">
          <FormSelect
            name="paymentMethodsAccepted"
            options={[{ value: "cash", label: "Cash" }]}
            placeholder="Select Payment Methods Accepted (up to 6)"
            label="Payment Methods Accepted"
            disabled
          />
          <FormInput
            name="pricingBasedOnDurationPer15Min"
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
              _placeholder: { color: "#667085" },
            }}
          />
        </Flex>

        <Flex alignItems="center" gap="8px">
          <CustomSwitch onChange={undefined} isChecked={false} />
          <Text fontSize="16px" fontWeight={600} color="secondary.950.light">
            Sliding Scale Availability
          </Text>
        </Flex>

        <Flex gap="16px" my="16px">
          <FormInput
            name="minimumFee"
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
              _placeholder: { color: "#667085" },
            }}
          />
          <FormInput
            name="maximumFee"
            label="Maximum Fee"
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
              _placeholder: { color: "#667085" },
            }}
          />
        </Flex>

        <Flex gap="12px">
          <Button
            type="button"
            fontSize="16px"
            fontWeight={600}
            bg="base.white.light"
            color="secondary.900.light"
            border="1px solid"
            borderColor="secondary.200.light"
            mt="16px"
            _hover={{
              bg: "secondary.500.light",
              color: "base.white.light",
            }}
            _active={{
              bg: "secondary.500.light",
              color: "base.white.light",
            }}
            onClick={() => {
              clearErrors();
              setActiveStep(3);
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            fontSize="16px"
            fontWeight={600}
            bg="secondary.500.light"
            color="base.white.light"
            border="1px solid"
            borderColor="secondary.500.light"
            mt="16px"
            _hover={{ bg: "base.white.light", color: "secondary.500.light" }}
            _active={{ bg: "base.white.light", color: "secondary.500.light" }}
          >
            Complete Information
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default SessionAndInsurance;
