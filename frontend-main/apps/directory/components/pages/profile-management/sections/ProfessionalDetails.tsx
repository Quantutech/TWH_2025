import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import IntroVideo from "@repo/ui/components/video/IntroVideo";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const ProfessionalDetails = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Box
      id="professional-details"
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
          Professional Details
        </Text>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          transitionDuration={"200ms"}
          _hover={{ cursor: "pointer", opacity: "0.5" }}
          onClick={() => {
            setActiveModal("professionalDetailsEdit");
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
            Professional Title:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.professionalTitle || "-"}
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
            License Number:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.licenseNumber || "-"}
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
            License State/Region:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.licenseState || "-"}
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
            Years of Experience:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {`${data?.yearsExperience} Years` || "-"}
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
            Education:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
            whiteSpace={"pre-wrap"}
          >
            {data?.education || "-"}
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
            Specialties:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.specialities?.length
              ? data?.specialities?.map((speciality, index) => {
                  const lastIndex = index === data?.specialities?.length - 1;
                  if (lastIndex) {
                    return speciality.name;
                  }
                  return `${speciality.name}, `;
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
            Bio:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
            whiteSpace={"pre-wrap"}
          >
            {data?.bio || "-"}
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
            Video Introduction:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            <IntroVideo
              videoUrl={data?.videoIntroUrl as string}
              containerProps={{ width: "300px" }}
            />
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfessionalDetails;
