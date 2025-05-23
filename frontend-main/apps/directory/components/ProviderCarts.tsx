"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import StarIcon from "@repo/ui/components/icons/StarIcon";
import RoundedFillCheckIcon from "@repo/ui/components/icons/RoundedFillCheckIcon";
import LocationIcon from "@repo/ui/components/icons/LocationIcon";
import HexagonPlusIcon from "@repo/ui/components/icons/HexagonPlusIcon";
import OnlineVideoIcon from "@repo/ui/components/icons/OnlineVideoIcon";
import ArmchairIcon from "@repo/ui/components/icons/ArmchairIcon";
import Pagination from "@repo/ui/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getProviderList } from "@repo/ui/utils/api";
import { getCookie } from "@repo/ui/utils/storage";
import { useRouter } from "next/navigation";
import {
  CustomAsyncSelectOption,
  ProviderListResponseData,
} from "@repo/ui/utils/type";
import { useFilterAndSortContext } from "../contexts/FilterAndSortContexts";
import { Tooltip } from "react-tooltip";
import ProfileImage from "@repo/ui/components/profile/ProfileImage";
import ListNoDataFound from "@repo/ui/components/list/ListNoDataFound";
import { getFormattedDateTime } from "@repo/ui/utils/helpers";

const ProviderCarts = () => {
  const {
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
    search,
    setSearch,
    activeSortBy,
    latLong,
  } = useFilterAndSortContext();

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      currentPage,
      search,
      gender,
      location,
      language,
      insurance,
      specialty,
      onlyAvailableDoctors,
      activeSortBy,
      latLong?.lat,
      latLong?.long,
      appointmentType,
      availability?.value,
    ],
    queryFn: (options) => {
      return getProviderList({
        page: options.queryKey[0] as number,
        limit: 20,
        keyword: options.queryKey[1] as string,
        gender: (options.queryKey[2] as CustomAsyncSelectOption)
          ?.value as string,
        state: (
          options.queryKey[3] as CustomAsyncSelectOption
        )?.label?.toLowerCase() as string,
        languages: (options.queryKey[4] as CustomAsyncSelectOption)
          ?.value as string,
        insurances: (options.queryKey[5] as CustomAsyncSelectOption)
          ?.value as string,
        specialties: (options.queryKey[6] as CustomAsyncSelectOption)
          ?.value as string,
        isAvailable: options.queryKey[7] as boolean,
        sort: options.queryKey[8] as number,
        lat: options.queryKey[9] as number,
        long: options.queryKey[10] as number,
        appointmentType: options.queryKey[11] as "in-person" | "online",
        dayOfWeek: options.queryKey[12] as
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday",
      });
    },
    retry: false,
  });

  useEffect(() => {
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);

    const keyword = searchParams.get("keyword");
    const stateValue = searchParams.get("stateValue");
    const stateLabel = searchParams.get("stateLabel");
    const insuranceValue = searchParams.get("insuranceValue");
    const insuranceLabel = searchParams.get("insuranceLabel");
    const specialtyValue = searchParams.get("specialtyValue");
    const specialtyLabel = searchParams.get("specialtyLabel");
    const availabilityValue = searchParams.get("availabilityValue");
    const availabilityLabel = searchParams.get("availabilityLabel");
    const genderValue = searchParams.get("genderValue");
    const genderLabel = searchParams.get("genderLabel");
    const languageValue = searchParams.get("languageValue");
    const languageLabel = searchParams.get("languageLabel");
    const isAvailable = searchParams.get("isAvailable");
    const appointmentType = searchParams.get("appointmentType");

    setSearch(keyword || "");
    setLocation({ value: stateValue as string, label: stateLabel as string });
    setInsurance({
      value: insuranceValue as string,
      label: insuranceLabel as string,
    });
    setSpecialty({
      value: specialtyValue as string,
      label: specialtyLabel as string,
    });
    setAvailability({
      value: availabilityValue as string,
      label: availabilityLabel as string,
    });
    setGender({
      value: genderValue as string,
      label: genderLabel as string,
    });
    setLanguage({
      value: languageValue as string,
      label: languageLabel as string,
    });
    if (isAvailable) {
      setOnlyAvailableDoctors(isAvailable === "true" ? true : false);
    }
    if (appointmentType) {
      setAppointmentType(appointmentType as "in-person" | "online");
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBookAppointmentClick = (
    clickedDataInfo: ProviderListResponseData
  ) => {
    const token = getCookie("token");
    if (!token) {
      router.push("/client-sign-in");
      return;
    }

    const parsedToken = JSON.parse(token);
    if (parsedToken?.length > 0) {
      router.push(`/provider-details/${clickedDataInfo?.profileSlug}`);
    }
  };

  const handleViewProfileClick = (
    clickedDataInfo: ProviderListResponseData
  ) => {
    return router.push(`/provider-details/${clickedDataInfo?.profileSlug}`);
  };

  const dataSide = useMemo(() => {
    if (isError) {
      return <ListNoDataFound />;
    } else if (isLoading) {
      return (
        <Flex
          width={"100%"}
          height={"calc(100dvh - 250px)"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            width={{ base: "40px", md: "60px" }}
            height={{ base: "40px", md: "60px" }}
            color="secondary.500.light"
          />
        </Flex>
      );
    } else {
      return data?.data?.data?.map((item) => {
        const firstTwoInsurances = item?.insurances?.slice(0, 2);
        const remainingInsurances = item?.insurances?.slice(2);
        return (
          <Flex
            key={item.id}
            bg={"base.white.light"}
            padding={{ base: "24px 16px", xl: "32px 24px" }}
            borderRadius={"16px"}
            flexDirection={"column"}
          >
            <Flex
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Flex gap={"16px"}>
                <ProfileImage
                  profileImageUrl={item?.profileImageUrl}
                  firstName={item?.firstName}
                  lastName={item?.lastName}
                  imageProps={{ width: "96px", height: "96px" }}
                />
                <Flex flexDirection={"column"} mt={{ base: "16px", md: "0px" }}>
                  <Flex>
                    <Text
                      fontSize={"16px"}
                      fontWeight={400}
                      color={"secondary.950.light"}
                    >
                      {item.firstName && item.lastName
                        ? `${item.firstName} ${item.lastName}`
                        : "-"}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      fontWeight={400}
                      color={"secondary.500.light"}
                      marginLeft={"4px"}
                    >
                      (
                      {item?.gender?.charAt(0)?.toUpperCase() +
                        item?.gender?.slice(1) || "-"}
                      )
                    </Text>
                  </Flex>
                  <Text
                    fontSize={"16px"}
                    fontWeight={400}
                    color={"secondary.500.light"}
                    cursor={"default"}
                  >
                    {item.professionalTitle || "-"}
                  </Text>
                </Flex>
              </Flex>
              <Box
                width={"100%"}
                h={"1px"}
                bg={"secondary.100.light"}
                display={{ base: "block", md: "none" }}
              />
              {/* Online - InPerson */}
              <Flex gap={"8px"} my={{ base: "12px", md: "0px" }}>
                {item?.appointmentType?.length &&
                  item?.appointmentType?.map((item) => {
                    if (item.type === "online") {
                      return (
                        <Text
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          borderRadius={"999px"}
                          fontWeight={500}
                          fontSize={"14px"}
                          width={{ base: "100px", lg: "100px", xl: "116px" }}
                          height={"36px"}
                          bg={"grayScale.50.light"}
                          gap={"4px"}
                        >
                          <OnlineVideoIcon /> Online
                        </Text>
                      );
                    }
                    return (
                      <Text
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"999px"}
                        fontWeight={500}
                        fontSize={"14px"}
                        width={{ base: "100px", lg: "100px", xl: "116px" }}
                        height={"36px"}
                        bg={"grayScale.50.light"}
                        gap={"4px"}
                      >
                        <ArmchairIcon /> In Person
                      </Text>
                    );
                  })}
              </Flex>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Flex
                marginLeft={{ base: "0px", xl: "112px" }}
                marginTop={{ base: "0px", xl: "-32px" }}
                flexDirection={"column"}
                minW={{ base: "100%", md: "368px" }}
                gap={"16px"}
              >
                {/* Evaluation and Comments */}
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  gap={{ base: "12px", md: "8px", lg: "12px", xl: "16px" }}
                >
                  {/* <Flex alignItems={"center"} gap={"4px"}>
                    <StarIcon />
                    <Text
                      fontWeight={500}
                      fontSize={"14px"}
                      color={"secondary.950.light"}
                    >
                      {item.avg_rating || "-"}
                    </Text>
                    <Text
                      fontWeight={500}
                      fontSize={"14px"}
                      color={"secondary.500.light"}
                    >
                      ({item.reviewCount || "0"} Reviews)
                    </Text>
                  </Flex> */}
                  <Flex alignItems={"center"} gap={"4px"}>
                    <RoundedFillCheckIcon />
                    <Text
                      fontWeight={500}
                      fontSize={"14px"}
                      color={"secondary.950.light"}
                    >
                      {item.approvedappointmentscount}
                    </Text>
                    <Text
                      fontWeight={500}
                      fontSize={"14px"}
                      color={"secondary.500.light"}
                    >
                      Successful Appointments
                    </Text>
                  </Flex>
                </Flex>
                {/* City */}
                <Flex alignItems={"center"} gap={"4px"}>
                  <LocationIcon />
                  <Text
                    fontWeight={400}
                    fontSize={"14px"}
                    color={"secondary.800.light"}
                  >
                    {item?.city && item?.country
                      ? `${item?.city}, ${item?.country}`
                      : "-"}
                  </Text>
                </Flex>
                {/* Insurance */}
                <Flex gap={"4px"}>
                  <HexagonPlusIcon />
                  <Text
                    fontWeight={400}
                    fontSize={"14px"}
                    color={"secondary.800.light"}
                  >
                    {firstTwoInsurances?.map((insurance, index) => (
                      <span key={insurance.name}>
                        {insurance.name}
                        {index < remainingInsurances?.length - 1 && ", "}
                      </span>
                    ))}
                    {remainingInsurances?.length > 0 && (
                      <>
                        <span
                          data-tooltip-id="provider-list-tooltip"
                          data-tooltip-content={remainingInsurances
                            ?.map((s) => s.name)
                            .join(", ")}
                        >
                          ...
                        </span>
                      </>
                    )}
                  </Text>
                </Flex>
                {/* Next Available */}
                <Flex gap={"4px"}>
                  <Text
                    fontWeight={400}
                    color={"secondary.500.light"}
                    fontSize={"14px"}
                  >
                    Next Available:
                  </Text>
                  <Text
                    fontWeight={400}
                    color={"secondary.800.light"}
                    fontSize={"14px"}
                  >
                    {(item?.availableSlot &&
                      getFormattedDateTime(item?.availableSlot)) ||
                      "-"}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                flexDirection={{ base: "row", md: "column" }}
                mt={{ base: "12px", md: "0px" }}
                gap={"8px"}
              >
                <Button
                  type="button"
                  width={{ base: "50%", md: "150px", xl: "240px" }}
                  height={{ base: "40px", xl: "48px" }}
                  fontWeight={600}
                  fontSize={"14px"}
                  border={"1px solid"}
                  borderColor={"primary.500.light"}
                  borderRadius={"8px"}
                  bg={"primary.500.light"}
                  color={"base.white.light"}
                  transitionDuration={"300ms"}
                  _active={{
                    bg: "base.white.light",
                    color: "primary.500.light",
                  }}
                  _hover={{
                    bg: "base.white.light",
                    color: "primary.500.light",
                  }}
                  onClick={() => handleBookAppointmentClick(item)}
                >
                  Book Appointment
                </Button>
                <Button
                  type="button"
                  width={{ base: "50%", md: "150px", xl: "240px" }}
                  height={{ base: "40px", xl: "48px" }}
                  fontWeight={600}
                  fontSize={"14px"}
                  border={"1px solid"}
                  borderColor={"primary.500.light"}
                  borderRadius={"8px"}
                  bg={"base.white.light"}
                  color={"primary.500.light"}
                  transitionDuration={"300ms"}
                  _active={{
                    bg: "primary.500.light",
                    color: "base.white.light",
                  }}
                  _hover={{
                    bg: "primary.500.light",
                    color: "base.white.light",
                  }}
                  onClick={() => handleViewProfileClick(item)}
                >
                  View Profile
                </Button>
              </Flex>
            </Flex>
          </Flex>
        );
      });
    }
  }, [isError, isLoading, data, handleBookAppointmentClick]);

  return (
    <Flex flexDirection={"column"} gap={"24px"}>
      {dataSide}
      {data?.data?.data?.length !== 0 && !isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.data?.meta?.totalPages || 0}
          onPageChange={handlePageChange}
        />
      )}
      <Tooltip
        style={{ zIndex: 500, maxWidth: "250px" }}
        id="provider-list-tooltip"
      />
    </Flex>
  );
};

export default ProviderCarts;
