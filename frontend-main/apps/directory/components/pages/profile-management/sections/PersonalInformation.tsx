import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import CirclePlusIcon from "@repo/ui/components/icons/CirclePlusIcon";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const PersonalInformation = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Flex
      id="personal-information"
      width={"100%"}
      flexDirection={"column"}
      gap={"16px"}
    >
      {/* PERSONAL INFORMATION CONTAINER*/}
      <Box
        padding={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        bg={"base.white.light"}
      >
        <Text
          color={"grayScale.950.light"}
          fontSize={"18px"}
          fontWeight={"600"}
        >
          Personal Information
        </Text>
        <Flex width={"100%"} flexWrap={"wrap"}>
          {/* FIRST NAME BOX */}
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"350px"}
            padding={"16px"}
            borderBottom={"1px solid"}
            borderRight={"1px solid"}
            borderColor={"secondary.100.light"}
          >
            <Flex flexDirection={"column"} gap={"4px"}>
              <Text
                color={"secondary.500.light"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                First Name
              </Text>
              <Text
                color={"secondary.950.light"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                {data?.firstName || "-"}
              </Text>
            </Flex>
            <Box
              transitionDuration={"200ms"}
              _hover={{ opacity: "0.5" }}
              onClick={() => {
                setActiveModal("personalInformationEdit");
              }}
            >
              {data?.firstName?.length ? (
                <UnderlineEditIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              ) : (
                <CirclePlusIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              )}
            </Box>
          </Flex>

          {/* MIDDLE NAME BOX */}
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"350px"}
            padding={"16px"}
            borderBottom={"1px solid"}
            borderRight={"1px solid"}
            borderColor={"secondary.100.light"}
          >
            <Flex flexDirection={"column"} gap={"4px"}>
              <Text
                color={"secondary.500.light"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                Middle Name
              </Text>
              <Text
                color={"secondary.950.light"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                {data?.middleName || "-"}
              </Text>
            </Flex>
            <Box
              transitionDuration={"200ms"}
              _hover={{ opacity: "0.5" }}
              onClick={() => {
                setActiveModal("personalInformationEdit");
              }}
            >
              {data?.middleName?.length ? (
                <UnderlineEditIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              ) : (
                <CirclePlusIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              )}
            </Box>
          </Flex>

          {/* LAST NAME BOX */}
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"350px"}
            padding={"16px"}
            borderBottom={"1px solid"}
            borderRight={"1px solid"}
            borderColor={"secondary.100.light"}
          >
            <Flex flexDirection={"column"} gap={"4px"}>
              <Text
                color={"secondary.500.light"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                Last Name
              </Text>
              <Text
                color={"secondary.950.light"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                {data?.lastName || "-"}
              </Text>
            </Flex>
            <Box
              transitionDuration={"200ms"}
              _hover={{ opacity: "0.5" }}
              onClick={() => {
                setActiveModal("personalInformationEdit");
              }}
            >
              {data?.lastName?.length ? (
                <UnderlineEditIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              ) : (
                <CirclePlusIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              )}
            </Box>
          </Flex>

          {/* Email BOX */}
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"350px"}
            padding={"16px"}
            borderBottom={"1px solid"}
            borderRight={"1px solid"}
            borderColor={"secondary.100.light"}
          >
            <Flex flexDirection={"column"} gap={"4px"}>
              <Text
                color={"secondary.500.light"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                Email
              </Text>
              <Text
                color={"secondary.950.light"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                {data?.email || "-"}
              </Text>
            </Flex>
            <Box
              transitionDuration={"200ms"}
              _hover={{ opacity: "0.5" }}
              onClick={() => {
                setActiveModal("emailEdit");
              }}
            >
              {data?.email?.length ? (
                <UnderlineEditIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              ) : (
                <CirclePlusIcon
                  svg={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              )}
            </Box>
          </Flex>

          {/* PASSWORD BOX */}
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"350px"}
            padding={"16px"}
            borderBottom={"1px solid"}
            borderRight={"1px solid"}
            borderColor={"secondary.100.light"}
          >
            <Flex flexDirection={"column"} gap={"4px"}>
              <Text
                color={"secondary.500.light"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                Password
              </Text>
              <Text
                color={"secondary.950.light"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                ******
              </Text>
            </Flex>
            <Box
              transitionDuration={"200ms"}
              _hover={{ opacity: "0.5" }}
              onClick={() => {
                setActiveModal("changePassword");
              }}
            >
              <UnderlineEditIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PersonalInformation;
