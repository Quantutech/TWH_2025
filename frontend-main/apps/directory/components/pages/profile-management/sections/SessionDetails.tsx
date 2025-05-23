import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import { capitalizeFirstLetter, convertToAMPM } from "@repo/ui/utils/helpers";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const SessionDetails = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Box
      id="session-details"
      padding={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      bg={"base.white.light"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          color={"grayScale.950.light"}
          fontSize={"18px"}
          fontWeight={"600"}
        >
          Profile and Session Details
        </Text>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          transitionDuration={"200ms"}
          _hover={{ cursor: "pointer", opacity: "0.5" }}
          onClick={() => {
            setActiveModal("sessionDetailsEdit");
          }}
        >
          <UnderlineEditIcon svg={{ width: "20px", height: "20px" }} />
        </Flex>
      </Flex>
      <Flex width={"100%"} gap={"24px"} mt={"16px"} flexWrap={"wrap"}>
        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Languages Spoken:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.languages?.length
              ? data?.languages?.map((language, index) => {
                  const lastIndex = index === data?.languages?.length - 1;
                  if (lastIndex) {
                    return language.name;
                  }
                  return `${language.name}, `;
                })
              : "-"}
          </Text>
        </Flex>

        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Appointment Types Offered:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.appointmentType?.length
              ? data?.appointmentType?.map((type, index) => {
                  const lastIndex = index === data?.appointmentType?.length - 1;
                  if (lastIndex) {
                    return (
                      type.name.charAt(0).toUpperCase() + type.name.slice(1)
                    );
                  }
                  return `${type.name.charAt(0).toUpperCase() + type.name.slice(1)}, `;
                })
              : "-"}
          </Text>
        </Flex>

        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Appointment Duration Options:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            30 Min
          </Text>
        </Flex>

        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Availability Days:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.providerAvailability?.length
              ? data?.providerAvailability?.map((type, index) => {
                  const lastIndex =
                    index === data?.providerAvailability?.length - 1;
                  if (lastIndex) {
                    return (
                      type.dayOfWeek.charAt(0).toUpperCase() +
                      type.dayOfWeek.slice(1)
                    );
                  }
                  return `${type.dayOfWeek.charAt(0).toUpperCase() + type.dayOfWeek.slice(1)}, `;
                })
              : "-"}
          </Text>
        </Flex>

        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Availability Hours:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.providerAvailability?.length
              ? convertToAMPM(
                  data?.providerAvailability?.[0]?.startTime as string
                ) +
                " - " +
                convertToAMPM(
                  data?.providerAvailability?.[0]?.endTime as string
                )
              : "-"}
          </Text>
        </Flex>

        <Flex width={"100%"}>
          <Text
            minW={"280px"}
            maxW={"280px"}
            width={"280px"}
            fontWeight={"400"}
            fontSize={"16px"}
            color={"secondary.500.light"}
          >
            Appointment Calendar Type:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.appointmentCalendarType
              ? capitalizeFirstLetter(
                  data?.appointmentCalendarType?.replaceAll("_", " ")
                )
              : "-"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SessionDetails;
