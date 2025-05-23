import React from "react";
import { HStack, Text } from "@chakra-ui/react";

const WhyTuneIn = () => {
  return (
    <HStack
      flexDir={{ base: "column", md: "row" }}
      maxW={"1440px"}
      margin={"auto"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      gap={"8px"}
    >
      <Text
        maxW={{ base: "100%", md: "210px" }}
        minW={{ base: "100%", md: "300px" }}
        fontWeight={"600"}
        fontSize={{ base: "24px", lg: "30px" }}
      >
        Why Tune In?
      </Text>
      <Text
        maxW={"868px"}
        fontWeight={"400"}
        fontSize={{ base: "16px", lg: "20px" }}
        color={"secondary.600.light"}
      >
        At TeleWellness Hub, we believe mental health and wellness should be
        accessible to everyone. Our podcast bridges the gap between clients
        seeking help and the providers who can offer it. Whether you're a
        listener exploring your options or a provider ready to amplify your
        voice, this is the space to make meaningful connections.
      </Text>
    </HStack>
  );
};

export default WhyTuneIn;
