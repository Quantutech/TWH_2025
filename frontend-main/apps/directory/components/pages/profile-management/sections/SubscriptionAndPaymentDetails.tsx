import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const SubscriptionAndPaymentDetails = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Box
      id="subscription-and-payment"
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
          Insurance and Payment Details
        </Text>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          transitionDuration={"200ms"}
          _hover={{ cursor: "pointer", opacity: "0.5" }}
          onClick={() => {
            setActiveModal("insuranceAndPaymentDetailsEdit");
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
            Insurance Accepted:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.insurances?.length
              ? data?.insurances?.map((language, index) => {
                  const lastIndex = index === data?.insurances?.length - 1;
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
            Payment Methods Accepted:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            Credit Card, PayPal, Venmo
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
            Pricing based on Duration:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            30 Min/$50, 45 Min/$75 , 60 Min/$100
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
            Sliding Scale Availability:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={"16PX"}
            color={"secondary.950.light"}
          >
            {data?.minFee && data?.maxFee
              ? `${data?.minFee} - ${data?.maxFee}`
              : "-"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SubscriptionAndPaymentDetails;
