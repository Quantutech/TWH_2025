import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const ContactInformation = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Box
      id="contact-info"
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
          Practice/Business Contact Information
        </Text>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          transitionDuration={"200ms"}
          _hover={{ cursor: "pointer", opacity: "0.5" }}
          onClick={() => {
            setActiveModal("contactInformationEdit");
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
            Phone Number:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.phoneNumber || "-"}
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
            Street Address:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.streetAddress || "-"}
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
            City:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.city || "-"}
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
            State/Region:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.state || "-"}
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
            Zip Code:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.zipCode || "-"}
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
            Country:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.address?.country || "-"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ContactInformation;
