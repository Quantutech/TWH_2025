import React from "react"
import { HStack, VStack, Text, Flex } from "@chakra-ui/react"
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type"
import EducationIcon from "@repo/ui/components/icons/EducationIcon"
import LicenseTypeIcon from "@repo/ui/components/icons/LicenseTypeIcon"
import GenderIcon from "@repo/ui/components/icons/GenderIcon"
import EthnicityIcon from "@repo/ui/components/icons/EthnicityIcon"
import LanguageIcon from "@repo/ui/components/icons/LanguageIcon"
import StarFrameIcon from "@repo/ui/components/icons/StarFrameIcon"
import ModalitiesIcon from "@repo/ui/components/icons/ModalitiesIcon"
import WorksWithIcon from "@repo/ui/components/icons/WorksWithIcon"

interface AboutTabProps {
  data: ResponseData<ProviderGetMeResponseData> | undefined
}

const AboutTab = ({ data }: AboutTabProps) => {
  return (
    <VStack
      id="about"
      w={"100%"}
      borderRadius={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      padding={{ base: "16px", lg: "24px" }}
      gap={"12px"}
      alignItems={"flex-start"}
      bg={"base.white.light"}
      overflow={"auto"}
      mb={{ base: "16px", lg: "24px" }}
    >
      <Text fontWeight={"600"} fontSize={"20px"} color={"secondary.950.light"}>
        More about {data?.data?.firstName || ""}
      </Text>
      <VStack gap={{ base: "16px", md: "24px" }} alignItems={"flex-start"}>
        <HStack alignItems={"flex-start"}>
          <EducationIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"130px"}
          >
            Education:
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"secondary.950.light"}
          >
            {data?.data?.education || "-"}
          </Text>
        </HStack>
        <HStack
          gap={"8px"}
          alignItems={"flex-start"}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
        >
          <Flex gap={"8px"} alignItems={"center"}>
            <LicenseTypeIcon />
            <Text
              fontWeight="400"
              fontSize="16px"
              color={"secondary.600.light"}
              whiteSpace={"nowrap"}
              minW={"130px"}
            >
              License type:
            </Text>
          </Flex>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"secondary.950.light"}
          >
            LCSW (Licensed Clinical Social Worker) (Texas), LICSW (Licensed
            Independent Clinical Social Worker) (Alabama)
          </Text>
        </HStack>
        <HStack gap={"8px"}>
          <GenderIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"130px"}
          >
            Gender:
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"secondary.950.light"}
          >
            {data?.data?.gender || "-"}
          </Text>
        </HStack>
        <HStack gap={"8px"}>
          <EthnicityIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"130px"}
          >
            Ethnicity:
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"secondary.950.light"}
          >
            {data?.data?.address?.country || "-"}
          </Text>
        </HStack>
        <HStack gap={"8px"}>
          <LanguageIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"130px"}
          >
            Language:
          </Text>
          <Flex>
            {data?.data?.languages && data?.data?.languages?.length > 0
              ? data.data.languages.map((lang, index) => {
                  const lastIndex = data.data.languages.length - 1
                  return (
                    <Text
                      key={lang.id}
                      fontWeight="400"
                      fontSize={{ base: "14px", sm: "16px" }}
                      color="secondary.950.light"
                      mr={index !== lastIndex ? "2px" : "0px"}
                    >
                      {lang.name}
                      {index !== lastIndex ? "," : ""}
                    </Text>
                  )
                })
              : "-"}
          </Flex>
        </HStack>
        <HStack gap={"8px"}>
          <WorksWithIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"130px"}
          >
            Works with:
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"seoncary.950.light"}
          >
            Adolescents, Adults, and Seniors
          </Text>
        </HStack>
        <HStack gap={"8px"}>
          <StarFrameIcon />
          <Text
            fontWeight="400"
            fontSize="16px"
            color={"secondary.600.light"}
            whiteSpace={"nowrap"}
            minW={"126px"}
          >
            More specialties:
          </Text>
          <Text>
            {data?.data?.specialities && data?.data?.specialities?.length > 0
              ? data.data.specialities.map((spec, index) => {
                  const lastIndex = data.data.specialities.length - 1
                  return (
                    <Text
                      key={spec.id}
                      fontWeight="400"
                      fontSize={{ base: "14px", sm: "16px" }}
                      color="secondary.950.light"
                      mr={index !== lastIndex ? "2px" : "0px"}
                    >
                      {spec.name}
                      {index !== lastIndex ? "," : ""}
                    </Text>
                  )
                })
              : "-"}
          </Text>
        </HStack>
        <HStack
          gap={"8px"}
          alignItems={"flex-start"}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
        >
          <Flex alignItems={"center"} gap={"8px"}>
            <ModalitiesIcon />
            <Text
              fontWeight="400"
              fontSize="16px"
              color={"secondary.600.light"}
              whiteSpace={"nowrap"}
              minW={"130px"}
            >
              Modalities:
            </Text>
          </Flex>
          <Text
            fontWeight="400"
            fontSize={{ base: "14px", sm: "16px" }}
            color={"secondary.950.light"}
          >
            Strength-Based, Solution Focused Brief (SFBT), Psychodynamic,
            Internal Family Systems (IFS), Motivational Interviewing, and
            Cognitive Behavioral (CBT)
          </Text>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default AboutTab
