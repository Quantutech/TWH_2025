"use client";
import { HStack, Text } from "@chakra-ui/react";
import { informationBoxes } from "@repo/ui/constants/constant";

const InformationBoxes = () => {
  return (
    <HStack
      margin={"auto"}
      justifyContent={"center"}
      gap={{ base: "8px", sm: "12px", lg: "24px" }}
      flexWrap={"wrap"}
      w={"1440px"}
      width={"100%"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      {informationBoxes.map((item, i) => (
        <HStack
          key={i}
          w={{
            base: "140px",
            sm: "220px",
            md: "180px",
            lg: "200px",
            xl: "300px",
            "2xl": "310px",
          }}
          padding={"24px 0px"}
          flexDirection={"column"}
          alignItems={"center"}
          borderRadius={"24px"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          textAlign="center"
        >
          <Text
            color={"primary.500.light"}
            fontSize={{ base: "18px", sm: "22px", lg: "30px" }}
            fontWeight={"700"}
          >
            {item?.header}
          </Text>
          <Text
            color={"secondary.800.light"}
            fontSize={{ base: "12px", sm: "14px", lg: "16px" }}
            fontWeight={"500"}
          >
            {item?.subHeader}
          </Text>
          <Text
            color={"secondary.800.light"}
            fontSize={{ base: "12px", sm: "14px", lg: "16px" }}
            fontWeight={"500"}
            p={{ base: "8px", sm: "12px", lg: "16px" }}
            h={{ base: "88px", sm: "70px", md: "106px", xl: "82px" }}
          >
            {item?.content}
          </Text>
        </HStack>
      ))}
    </HStack>
  );
};

export default InformationBoxes;
