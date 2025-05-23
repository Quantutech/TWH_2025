import React, { Dispatch, SetStateAction } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import CirclePlusIcon from "@repo/ui/components/icons/CirclePlusIcon";
import { ClientGetMeResponseData } from "@repo/ui/utils/type";
import { formatDateToReadable } from "@repo/ui/utils/helpers";

interface Props {
  data: ClientGetMeResponseData | undefined;
  setActiveModal: Dispatch<
    SetStateAction<
      "personalInformationEdit" | "emailEdit" | "passwordEdit" | undefined
    >
  >;
}
const PersonalInformation = ({ data, setActiveModal }: Props) => {
  return (
    <Flex mt={"32px"} flexDirection={"column"} gap={"16px"}>
      <Text color={"grayScale.950.light"} fontSize={"18px"} fontWeight={600}>
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
              maxW={"280px"}
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
              maxW={"280px"}
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
              maxW={"280px"}
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

        {/* EMAIL BOX */}
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
              maxW={"280px"}
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

        {/* PHONE NUMBER BOX */}
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
              Phone Number
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.address?.phoneNumber || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.address?.phoneNumber?.length ? (
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
              maxW={"280px"}
            >
              *************
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("passwordEdit");
            }}
          >
            <UnderlineEditIcon
              svg={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
          </Box>
        </Flex>

        {/* DATE OF BIRTH BOX */}
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
              Date of Birth
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.birthDate
                ? formatDateToReadable(data?.birthDate as Date)
                : "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.birthDate ? (
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

        {/* SOCIAL SECURITY NUMBER BOX */}
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
              Social Security Number (SSN)
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.socialSecurityNumber || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.socialSecurityNumber?.length ? (
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

        {/* GENDER BOX */}
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
              Gender
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.gender || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.gender?.length ? (
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

        {/* COUNTRY BOX */}
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
              Country
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.address?.country || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.address?.country?.length ? (
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

        {/* STATE BOX */}
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
              State
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.address?.state || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.address?.state?.length ? (
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

        {/* CITY BOX */}
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
              City
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.address?.city || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.address?.city?.length ? (
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

        {/* ZIP CODE BOX */}
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
              Zip Code
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
              maxW={"280px"}
            >
              {data?.address?.zipCode || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("personalInformationEdit");
            }}
          >
            {data?.address?.zipCode?.length ? (
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
      </Flex>
    </Flex>
  );
};

export default PersonalInformation;
