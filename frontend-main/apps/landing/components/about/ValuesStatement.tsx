"use client";
import React from "react";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { aboutValuesStatement } from "@repo/ui/constants/constant";
import image from "@repo/ui/assets/about/values-statement.webp";

const ValuesStatement = () => {
  return (
    <Box width={"100%"} bg={"base.white.light"}>
      <HStack
        justifyContent={"space-between"}
        maxW={"1440px"}
        margin={"auto"}
        w={"100%"}
        flexDir={{ base: "column", lg: "row" }}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        alignItems={"flex-start"}
      >
        <Image
          src={image.src}
          alt=""
          minW={"50px"}
          maxW={"650px"}
          width={"100%"}
          order={{ base: 2, lg: 1 }}
          margin={{ base: "auto", lg: "0px" }}
        />
        <Box order={{ base: 1, lg: 2 }}>
          <Text
            fontWeight="700"
            fontSize={{ base: "24px", md: "30px" }}
            mb="10px"
            color={"secondary.950.light"}
            ml={{ base: "0px", lg: "-16px" }}
          >
            Values Statement
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "18px", md: "20px" }}
            color={"secondary.600.light"}
            mb="20px"
            ml={{ base: "0px", lg: "-16px" }}
          >
            At TeleWellness Hub, we are guided by these core values:
          </Text>
          <VStack align="start" spacing={{ base: "16px", md: "24px" }}>
            {aboutValuesStatement.map((item, index) => (
              <Box key={index}>
                <Text
                  fontWeight="600"
                  fontSize={{ base: "18px", lg: "20px" }}
                  color={"secondary.950.light"}
                  ml={{ base: "0px", lg: "-16px" }}
                >
                  • {item.title}
                </Text>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="secondary.600.light"
                >
                  {item.description}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default ValuesStatement;
