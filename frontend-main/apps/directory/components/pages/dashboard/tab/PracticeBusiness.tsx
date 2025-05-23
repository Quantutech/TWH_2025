"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import StatusTab from "./StatusTab";
import FormPhoneInput from "@repo/ui/components/form/FormPhoneInput";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import { getCities, getCountries, getStates } from "@repo/ui/utils/api";
import FormInput from "@repo/ui/components/form/FormInput";
import FormTextarea from "@repo/ui/components/form/FormTextarea";
import { colors } from "@repo/ui/theme";

interface Props {
  activeStep: number | undefined;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  methods: any;
}

const PracticeBusiness = ({ activeStep, setActiveStep, methods }: Props) => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>(233);
  const [selectedStateId, setSelectedStateId] = useState<number>(0);

  const handleNextButtonClick = () => {
    const formNames = [
      "phoneNumber",
      "country",
      "state",
      "city",
      "zipCode",
      "streetAddress",
    ];
    formNames.map((name) => {
      if (!methods?.getValues(name)) {
        methods?.setError(name, {
          type: "manual",
          message: "Required",
        });
      }
    });

    if (Object.keys(methods?.formState?.errors).length === 0) {
      setActiveStep(4);
    }
  };

  return (
    <>
      <StatusTab activeStep={activeStep} />
      <Box
        bg={"base.white.light"}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        overflow={"hidden"}
        mt={"24px"}
        p={"16px 24px"}
      >
        <Text
          fontWeight={600}
          fontSize={"20px"}
          color={"grayScale.950.light"}
          mb={"24px"}
        >
          Practice/Business Contact Information
        </Text>
        <Flex gap={"16px"}>
          <FormPhoneInput
            name="phoneNumber"
            label="Phone*"
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
          <FormAsyncSelect
            name={"country"}
            label="Country*"
            placeholder="Select Country"
            searchInputProps={{
              color: "secondary.950.light",
              _placeholder: { color: "grayScale.600.light" },
            }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            queryKey={["country"]}
            queryFn={(option) =>
              getCountries(option?.queryKey[0] as string, option?.pageParam)
            }
            // onChange={(option) => {
            //   setSelectedCountryId(option?.id);
            // }}
          />
        </Flex>
        <Flex width={"100%"} gap={"16px"} my={"16px"}>
          <FormAsyncSelect
            name={"state"}
            label="State/Region*"
            placeholder="Select State/Region"
            searchInputProps={{
              color: "secondary.950.light",
              _placeholder: { color: "grayScale.600.light" },
            }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            disabled={!selectedCountryId}
            queryKey={["state", 20, selectedCountryId]}
            queryFn={(option) =>
              getStates(
                option?.queryKey[0] as string,
                option?.pageParam,
                option?.queryKey[2] as number,
                option?.queryKey[3] as number
              )
            }
            onChange={(option) => {
              setSelectedStateId(option?.id);
            }}
          />
          <FormAsyncSelect
            name={"city"}
            label="City*"
            placeholder="Select City"
            searchInputProps={{
              color: "secondary.950.light",
              _placeholder: { color: "grayScale.600.light" },
            }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            disabled={!selectedStateId}
            queryKey={["city", 20, selectedStateId]}
            queryFn={(option) =>
              getCities(
                option?.queryKey[0] as string,
                option?.pageParam,
                option?.queryKey[2] as number,
                option?.queryKey[3] as number
              )
            }
          />
          <FormInput
            name={"zipCode"}
            label="Zip Code*"
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
              color: "#101828",
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
          textareaProps={{ rows: 6 }}
          placeholder="Enter Street Address..."
        />
        <Flex gap={"12px"}>
          <Button
            type="button"
            fontSize={"16px"}
            fontWeight={600}
            bg={"base.white.light"}
            color={"secondary.900.light"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            mt={"16px"}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={() => {
              methods.clearErrors();
              setActiveStep(2);
            }}
          >
            Back
          </Button>
          <Button
            type="button"
            fontSize={"16px"}
            fontWeight={600}
            bg={"primary.500.light"}
            color={"base.white.light"}
            border={"1px solid"}
            borderColor={"primary.500.light"}
            mt={"16px"}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={handleNextButtonClick}
          >
            Save and Continue
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default PracticeBusiness;
