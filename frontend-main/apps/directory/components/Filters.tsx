"use client";
import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import FilterIcon from "@repo/ui/components/icons/FilterIcon";
import CustomSelect from "@repo/ui/components/elements/CustomSelect";
import CustomAsyncSelect from "@repo/ui/components/elements/async/CustomAsyncSelect";
import CustomSwitch from "@repo/ui/components/elements/CustomSwitch";
import { useFilterAndSortContext } from "../contexts/FilterAndSortContexts";
import CloseIcon from "@repo/ui/components/icons/CloseIcon";
import {
  getInsurances,
  getLanguages,
  getSpecialities,
  getStates,
} from "@repo/ui/utils/api";
import { useRouter, usePathname } from "next/navigation";

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isFiltersClicked,
    setIsFiltersClicked,
    appointmentType,
    setAppointmentType,
    specialty,
    setSpecialty,
    insurance,
    setInsurance,
    location,
    setLocation,
    availability,
    setAvailability,
    gender,
    setGender,
    language,
    setLanguage,
    onlyAvailableDoctors,
    setOnlyAvailableDoctors,
    resetFilters,
  } = useFilterAndSortContext();

  const handleClearFiltersButtonClick = () => {
    resetFilters();
    router.push(pathname);
  };

  return (
    <Flex
      position={{ base: "fixed", lg: "static" }}
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={100}
      opacity={{ base: isFiltersClicked ? 1 : 0, lg: 1 }}
      pointerEvents={{ base: isFiltersClicked ? "auto" : "none", lg: "auto" }}
      maxW={{ base: "100%", lg: "250px", xl: "310px" }}
      minW={{ base: "250px", lg: "250px", xl: "310px" }}
      maxH={{ base: "100%", xl: "700px" }}
      flexDirection={"column"}
      bg={"base.white.light"}
      borderRadius={"16px"}
      padding={"24px 0px"}
      transition={"300ms"}
    >
      <Flex
        w={"100%"}
        gap={"16px"}
        alignItems={"center"}
        padding={"0px 24px 16px 24px"}
        borderBottom={"1px solid"}
        borderColor={"secondary.100.light"}
      >
        <FilterIcon />
        <Text fontSize={"18px"} fontWeight={600} color={"secondary.950.light"}>
          Filters
        </Text>
        <Flex
          display={{ base: "flex", lg: "none" }}
          cursor={"pointer"}
          marginLeft={"auto"}
          width={"22px"}
          height={"22px"}
          onClick={() => {
            setIsFiltersClicked(false);
          }}
        >
          <CloseIcon svg={{ style: { width: "100%", height: "100%" } }} />
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        gap={"16px"}
        padding={"24px 24px 0px 24px"}
      >
        <Flex
          w={"100%"}
          bg={"secondary.50.light"}
          padding={"4px"}
          borderRadius={"10px"}
        >
          <Text
            w={"50%"}
            bg={
              appointmentType === "in-person"
                ? "base.white.light"
                : "transparent"
            }
            color={
              appointmentType === "in-person"
                ? "primary.600.light"
                : "primary.500.light"
            }
            textAlign={"center"}
            borderRadius={"10px"}
            padding={"6px 0px"}
            cursor={"pointer"}
            userSelect={"none"}
            fontWeight={600}
            fontSize={"14px"}
            transitionDuration={"300ms"}
            _hover={{ color: "primary.600.light" }}
            onClick={() => {
              setAppointmentType("in-person");
              const queryParams = new URLSearchParams(window.location.search);
              queryParams.set("appointmentType", "in-person");
              router.push(
                `${window.location.pathname}?${queryParams.toString()}`
              );
            }}
          >
            In Person
          </Text>
          <Text
            w={"50%"}
            bg={
              appointmentType === "online" ? "base.white.light" : "transparent"
            }
            color={
              appointmentType === "online"
                ? "primary.600.light"
                : "primary.500.light"
            }
            textAlign={"center"}
            borderRadius={"10px"}
            padding={"6px 0px"}
            cursor={"pointer"}
            userSelect={"none"}
            fontWeight={600}
            fontSize={"14px"}
            transitionDuration={"300ms"}
            _hover={{ color: "primary.600.light" }}
            onClick={() => {
              setAppointmentType("online");
              const queryParams = new URLSearchParams(window.location.search);
              queryParams.set("appointmentType", "online");
              router.push(
                `${window.location.pathname}?${queryParams.toString()}`
              );
            }}
          >
            Online
          </Text>
        </Flex>
        <CustomAsyncSelect
          placeholder="Select specialty"
          label="Specialty"
          selectedOption={specialty}
          setSelectedOption={setSpecialty}
          isSearchable
          queryKey={["specialty"]}
          queryFn={(option) =>
            getSpecialities(option?.queryKey[0] as string, option?.pageParam)
          }
          optionClick={(option) => {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("specialtyValue", option?.id?.toString() || "");
            queryParams.set("specialtyLabel", option?.name?.toString() || "");
            router.push(
              `${window.location.pathname}?${queryParams.toString()}`
            );
          }}
        />
        <CustomAsyncSelect
          placeholder="Select Insurance"
          label="Insurance"
          selectedOption={insurance}
          setSelectedOption={setInsurance}
          isSearchable
          queryKey={["insurance"]}
          queryFn={(option) =>
            getInsurances(option?.queryKey[0] as string, option?.pageParam)
          }
          optionClick={(option) => {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("insuranceValue", option?.id?.toString() || "");
            queryParams.set("insuranceLabel", option?.name?.toString() || "");
            router.push(
              `${window.location.pathname}?${queryParams.toString()}`
            );
          }}
        />

        <CustomAsyncSelect
          placeholder="Select Location"
          label="Location"
          selectedOption={location}
          setSelectedOption={setLocation}
          isSearchable
          queryKey={["location"]}
          queryFn={(option) =>
            getStates(option?.queryKey[0] as string, option?.pageParam, 20, 233)
          }
          optionClick={(option) => {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("stateValue", option?.id?.toString() || "");
            queryParams.set("stateLabel", option?.name?.toString() || "");
            router.push(
              `${window.location.pathname}?${queryParams.toString()}`
            );
          }}
        />
        <CustomSelect
          placeholder="Select Availability"
          options={[
            { value: "monday", label: "Monday" },
            { value: "tuesday", label: "Tuesday" },
            { value: "wednesday", label: "Wednesday" },
            { value: "thursday", label: "Thursday" },
            { value: "friday", label: "Friday" },
            { value: "saturday", label: "Saturday" },
            { value: "sunday", label: "Sunday" },
          ]}
          label="Availability"
          selectedOption={availability}
          setSelectedOption={setAvailability}
          optionClick={(option) => {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set(
              "availabilityValue",
              option?.value?.toString() || ""
            );
            queryParams.set(
              "availabilityLabel",
              option?.label?.toString() || ""
            );
            router.push(
              `${window.location.pathname}?${queryParams.toString()}`
            );
          }}
        />
        <Flex gap={"8px"} flexDirection={{ base: "column", xl: "row" }}>
          <CustomSelect
            containerProps={{
              width: { base: "100%", xl: "50%" },
            }}
            placeholder="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            label="Gender"
            selectedOption={gender}
            setSelectedOption={setGender}
            optionClick={(option) => {
              const queryParams = new URLSearchParams(window.location.search);
              queryParams.set("genderValue", option?.value?.toString() || "");
              queryParams.set("genderLabel", option?.label?.toString() || "");
              router.push(
                `${window.location.pathname}?${queryParams.toString()}`
              );
            }}
          />
          <CustomAsyncSelect
            containerProps={{
              width: { base: "100%", xl: "50%" },
            }}
            placeholder="Language"
            label="Language"
            selectedOption={language}
            setSelectedOption={setLanguage}
            isSearchable={false}
            queryKey={["language"]}
            queryFn={() => getLanguages()}
            optionClick={(option) => {
              const queryParams = new URLSearchParams(window.location.search);
              queryParams.set("languageValue", option?.id?.toString() || "");
              queryParams.set("languageLabel", option?.name?.toString() || "");
              router.push(
                `${window.location.pathname}?${queryParams.toString()}`
              );
            }}
          />
        </Flex>
        <CustomSwitch
          containerProps={{
            borderTop: "1px solid",
            borderColor: "secondary.100.light",
            paddingTop: "10px",
          }}
          label="Only available providers"
          isChecked={onlyAvailableDoctors}
          onChange={(e) => {
            setOnlyAvailableDoctors(e.target.checked);
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("isAvailable", e.target.checked?.toString() || "");
            router.push(
              `${window.location.pathname}?${queryParams.toString()}`
            );
          }}
        />
        <Button
          type="button"
          display={{ base: "none", lg: "block" }}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          color={"base.white.light"}
          bg={"primary.500.light"}
          _hover={{ bg: "base.white.light", color: "primary.500.light" }}
          transition={"300ms"}
          onClick={handleClearFiltersButtonClick}
        >
          Clear Filters
        </Button>
        <Button
          type="button"
          display={{ base: "block", lg: "none" }}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          color={"base.white.light"}
          bg={"primary.500.light"}
          _hover={{ bg: "base.white.light", color: "primary.500.light" }}
          mt={"16px"}
          transition={"300ms"}
        >
          Apply Filters
        </Button>
      </Flex>
    </Flex>
  );
};

export default Filters;
