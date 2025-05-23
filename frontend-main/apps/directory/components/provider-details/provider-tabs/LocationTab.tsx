import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import LocationIcon from "@repo/ui/components/icons/Location"
import CallCallingIcon from "@repo/ui/components/icons/CallCallingIcon"
import SmsIcon from "@repo/ui/components/icons/SmsIcon"
import { PiMapPinSimpleArea } from "react-icons/pi"
import { colors } from "@repo/ui/theme"
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type"

interface LocationTabProps {
  data: ResponseData<ProviderGetMeResponseData> | undefined
}

const LocationTab = ({ data }: LocationTabProps) => {
  return (
    <VStack
      id="location"
      w={"100%"}
      borderRadius={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      padding={{ base: "16px", lg: "24px" }}
      gap={"12px"}
      alignItems={"flex-start"}
      bg={"base.white.light"}
      mb={{ base: "16px", lg: "24px" }}
    >
      <Text fontWeight={"600"} fontSize={"20px"} color={"secondary.950.light"}>
        Practice Location and Contact Info
      </Text>
      <VStack
        w={"100%"}
        padding={"24px"}
        gap={"16px"}
        borderRadius={"12px"}
        overflow={"auto"}
        bg={"secondary.50.light"}
        alignItems={"flex-start"}
      >
        <Text
          fontWeight={"600"}
          fontSize={"18px"}
          color={"secondary.950.light"}
        >
          Health First Medical Clinic
        </Text>
        <VStack gap={"16px"}>
          <HStack
            width={"100%"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            flexWrap={{ base: "wrap", sm: "nowrap" }}
          >
            <HStack minW={{ base: "100px", lg: "130px" }}>
              <Box
                width={{ base: "18px", md: "24px" }}
                height={{ base: "18px", md: "24px" }}
              >
                <LocationIcon
                  svg={{ width: "100%", height: "100%" }}
                  path={{ fill: colors.base.black.light }}
                />
              </Box>
              <Text
                fontWeight="500"
                fontSize="16px"
                color={"secondary.900.light"}
              >
                Address:
              </Text>
            </HStack>
            <VStack gap={"8px"} alignItems={"flex-start"}>
              <Text
                fontWeight={"500"}
                fontSize={{ base: "14px", md: "16px" }}
                color={"secondary.600.light"}
              >
                {data?.data?.address?.streetAddress || ""},{" "}
                {data?.data?.address?.city || ""},{" "}
                {data?.data?.address?.state || ""},
                {data?.data?.address?.zipCode || ""},{" "}
                {data?.data?.address?.country || ""}
              </Text>
              <HStack onClick={() => console.log("Clicked")} cursor={"pointer"}>
                <Icon
                  as={PiMapPinSimpleArea}
                  boxSize={6}
                  color={"primary.500.light"}
                />
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  color={"primary.500.light"}
                >
                  View on Map
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack
            width={"100%"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <HStack minW={{ base: "100px", lg: "130px" }}>
              <CallCallingIcon svg={{ width: "24px", height: "24px" }} />
              <Text
                fontWeight="500"
                fontSize="16px"
                color={"secondary.900.light"}
              >
                Phone:
              </Text>
            </HStack>
            <VStack gap={"8px"} alignItems={"flex-start"}>
              <Text
                fontWeight={"500"}
                fontSize={{ base: "14px", md: "16px" }}
                color={"secondary.600.light"}
              >
                {data?.data?.address?.phoneNumber || "-"}
              </Text>
            </VStack>
          </HStack>
          <HStack
            width={"100%"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <HStack minW={{ base: "100px", lg: "130px" }}>
              <SmsIcon svg={{ width: "24px", height: "24px" }} />
              <Text
                fontWeight="500"
                fontSize="16px"
                color={"secondary.900.light"}
              >
                Email:
              </Text>
            </HStack>
            <VStack gap={"8px"} alignItems={"flex-start"}>
              <Text
                fontWeight={"500"}
                fontSize={{ base: "14px", md: "16px" }}
                color={"secondary.600.light"}
              >
                {data?.data?.email || "-"}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default LocationTab
