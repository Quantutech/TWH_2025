import React from "react";
import { Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { insurance } from "@repo/ui/constants/constant";

const Insurance = () => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      bg={"secondary.50.light"}
      maxW={"1440px"}
      margin={"auto"}
      maxWidth={"1440px"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <Flex width={"100%"} flexDirection={"column"} gap={"24px"}>
        <Text
          fontSize={{
            base: "18px",
            sm: "20px",
            lg: "20px",
            xl: "30px",
          }}
          fontWeight={700}
          color={"secondary.950.light"}
        >
          Find an in Network Doctor from over 1,000 Insurance Plans
        </Text>
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight={400}
          color={"grayScale.500.light"}
          mt={"-20px"}
        >
          Add your insurance to see in-network primary care doctors
        </Text>
        {/* <Button
          type="button"
          display={{ base: "none", lg: "block" }}
          width={{ base: "180px", xl: "200px" }}
          height={{ base: "36px", lg: "36px", xl: "44px" }}
          fontSize={{ base: "14px", sm: "16px" }}
          bg={"transparent"}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          borderRadius={"8px"}
          color={"primary.500.light"}
          transitionDuration={"300ms"}
          _hover={{
            bg: "primary.500.light",
            color: "base.white.light",
          }}
        >
          See All Insurance
        </Button> */}
      </Flex>
      <Grid
        width={"100%"}
        my={{ base: "24px", lg: "0px" }}
        templateColumns={{
          base: "repeat(2, 130px)",
          sm: "repeat(3, 130px)",
          md: "repeat(3, 180px)",
          lg: "repeat(3, 170px)",
          "2xl": "repeat(3, 200px)",
        }}
        gap={{ base: "12px", xl: "24px" }}
        justifyContent={{ base: "start", lg: "end" }}
      >
        {insurance.map((item, index) => (
          <Flex
            key={index}
            justifyContent={"center"}
            width={"100%"}
            height={{ base: "90px", md: "110px", lg: "90px", "2xl": "120px" }}
            alignItems={"center"}
            padding={{ base: "18px 14px", md: "36px 28px", xl: "36px 28px" }}
            bg={"base.white.light"}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            borderRadius={"16px"}
          >
            <Image src={item.image} alt={item.title} />
          </Flex>
        ))}
      </Grid>
      <Button
        type="button"
        display={{ base: "block", lg: "none" }}
        width={{ base: "180px", xl: "200px" }}
        height={{ base: "36px", lg: "36px", xl: "44px" }}
        fontSize={{ base: "14px", sm: "16px" }}
        bg={"transparent"}
        border={"1px solid"}
        borderColor={"primary.500.light"}
        borderRadius={"8px"}
        color={"primary.500.light"}
        transitionDuration={"300ms"}
        _hover={{
          bg: "primary.500.light",
          color: "base.white.light",
        }}
      >
        See All Insurance
      </Button>
    </Flex>
  );
};

export default Insurance;
