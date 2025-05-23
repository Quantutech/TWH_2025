"use client";
import React, { useState } from "react";
import {
  Box,
  Center,
  chakra,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { providerDetailsBySlug } from "@repo/ui/utils/api";
import { useQuery } from "@tanstack/react-query";
import AppointmentScheduler from "./AppointmentScheduler";
import AppointmentSchedulerMobile from "./AppointmentSchedulerMobile";
import AboutTab from "./provider-tabs/AboutTab";
import IntroductionTab from "./provider-tabs/IntroductionTab";
import LocationTab from "./provider-tabs/LocationTab";
import MediaTab from "./provider-tabs/MediaTab";
import ProfileTab from "./provider-tabs/ProfileTab";
import ResourcesTab from "./provider-tabs/ResourcesTab";
import ServicesTab from "./provider-tabs/ServicesTab";
import { ProviderDetailActiveTab } from "@repo/ui/utils/type";
import Tab from "./Tab";
import IntroVideo from "@repo/ui/components/video/IntroVideo";

const GradientBackground = chakra(Box, {
  baseStyle: {
    w: "%100",
    minH: { base: "120px", md: "200px" },
    bgGradient: "linear(to-r, #9C27B0, #FF9800)",
    p: 8,
  },
});

const ProfileDetails = ({ slug }: { slug: string }) => {
  const [activeTab, setActiveTab] =
    useState<ProviderDetailActiveTab>("introduction");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["provider", slug],
    queryFn: (options) => {
      return providerDetailsBySlug(options.queryKey[1] as string);
    },
  });

  if (isLoading)
    return (
      <Center width={"100%"} height={"calc(100dvh - 96px)"}>
        <Spinner color="secondary.500.light" width={"60px"} height={"60px"} />
      </Center>
    );

  if (isError)
    return (
      <Center width={"100%"} height={"calc(100dvh - 96px)"}>
        <Text>Something went wrong</Text>
      </Center>
    );

  const providerId = data?.data?.address?.providerId;
  const insurance = data?.data?.insurances.map((item: any) => {
    return {
      id: item?.id,
      name: item?.name,
    };
  });
  const appointmentCalendarType = data?.data?.appointmentCalendarType;

  return (
    <Box>
      <GradientBackground />
      <HStack
        width={"100%"}
        maxW={"1440px"}
        mx={"auto"}
        padding={{
          base: "16px 16px 32px 16px",
          sm: "16px 16px 32px 16px",
          md: "16px 16px 32px 16px",
          lg: "16px 16px 32px 16px",
          xl: "24px 16px 64px 16px",
          "2xl": "24px 0px 64px 0px",
        }}
        alignItems={"flex-start"}
        gap={{ base: "0px", md: "16px", lg: "24px", xl: "24px", "2xl": "24px" }}
      >
        <Flex width={"100%"} flexDirection={"column"}>
          <ProfileTab data={data} />
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          <IntroductionTab data={data} />
          <LocationTab data={data} />
          <ServicesTab data={data} />
          <AboutTab data={data} />
          {/* <MediaTab />
          <ResourcesTab /> */}
        </Flex>
        <VStack display={{ base: "flex", lg: "none" }}>
          <AppointmentSchedulerMobile
            providerId={providerId}
            insurance={insurance}
            appointmentCalendarType={appointmentCalendarType}
            providerAvailability={data?.data?.providerAvailability}
            googleCalendarLink={data?.data?.externalAppointmentUrl || ""}
            nextAvailable={data?.data?.availableSlot || ""}
            data={data}
          />
        </VStack>
        <VStack
          display={{ base: "none", lg: "flex" }}
          minW={{ base: "390px", md: "390px", lg: "390px", xl: "420px" }}
          width={{ base: "390px", md: "390px", lg: "390px", xl: "420px" }}
          maxW={{ base: "390px", md: "390px", lg: "390px", xl: "420px" }}
          gap={"0px"}
        >
          <AppointmentScheduler
            providerId={providerId}
            insurance={insurance}
            appointmentCalendarType={appointmentCalendarType}
            providerAvailability={data?.data?.providerAvailability}
            googleCalendarLink={data?.data?.externalAppointmentUrl || ""}
            address={data?.data?.address || ""}
            appointmentType={data?.data?.appointmentType}
          />
          {data?.data.videoIntroUrl && (
            <Box
              width="100%"
              height="238px"
              borderRadius="12px"
              overflow="hidden"
            >
              <IntroVideo videoUrl={data?.data.videoIntroUrl} />
            </Box>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default ProfileDetails;
