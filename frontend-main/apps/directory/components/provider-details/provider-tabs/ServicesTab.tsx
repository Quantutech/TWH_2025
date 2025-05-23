import { VStack, Text, Tag, Wrap } from "@chakra-ui/react"
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type"
import React, { Key } from "react"

interface ServicesTabProps {
  data: ResponseData<ProviderGetMeResponseData> | undefined
}

const ServicesTab = ({ data }: ServicesTabProps) => {
  return (
    <VStack
      id="services"
      w={"100%"}
      borderRadius={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      padding={"24px"}
      gap={"12px"}
      alignItems={"flex-start"}
      bg={"base.white.light"}
      mb={{ base: "16px", lg: "24px" }}
    >
      <Text fontWeight={"600"} fontSize={"20px"} color={"secondary.950.light"}>
        Services
      </Text>
      <Wrap spacing={2} flexWrap={"wrap"}>
        {data?.data?.specialities?.map(
          (speciality: { id: Key; name: string }) => (
            <Tag
              key={speciality.id}
              borderRadius={"full"}
              fontWeight={"400"}
              fontSize={"16px"}
              bg={"secondary.50.light"}
              color={"secondary.950.light"}
            >
              {speciality.name}
            </Tag>
          ),
        )}
      </Wrap>
    </VStack>
  )
}

export default ServicesTab
