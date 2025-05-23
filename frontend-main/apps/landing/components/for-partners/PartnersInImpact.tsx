"use client";
import React from "react";
import { Text, Flex, Box, Image } from "@chakra-ui/react";
import { partnersInImpact } from "@repo/ui/constants/constant";
import Slider from "@repo/ui/components/custom-slider/Slider";

const PartnersInImpact = () => {
  return (
    <Box
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      bg={"base.white.light"}
      w={"100%"}
    >
      <Box maxW={"1440px"} margin={"auto"}>
        <Slider
          sliderTitleComponent={
            <>
              <Text
                fontSize={{ base: "24px", md: "26px", lg: "30px" }}
                fontWeight={700}
                color="secondary.950.light"
                mb={{ base: "8px", md: "16px" }}
              >
                Partners in Impact
              </Text>
              <Text
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight={400}
                color="secondary.600.light"
                maxW={"930px"}
              >
                Read about how our existing partners have successfully connected
                with providers, expanded their reach, and made a tangible impact
                on mental health and wellness.
              </Text>
            </>
          }
        >
          {partnersInImpact.map((item) => {
            return (
              <Flex
                minW={{
                  base: "290px",
                  sm: "330px",
                  md: "350px",
                  lg: "370px",
                  xl: "384px",
                }}
                width={{
                  base: "290px",
                  sm: "330px",
                  md: "350px",
                  lg: "370px",
                  xl: "384px",
                }}
                maxW={{
                  base: "290px",
                  sm: "330px",
                  md: "350px",
                  lg: "370px",
                  xl: "384px",
                }}
                height={"290px"}
                flexDirection={"column"}
                cursor={"pointer"}
                transitionDuration={"300ms"}
                padding={"24px"}
                border={"1px solid"}
                borderColor={"secondary.100.light"}
                borderRadius={"16px"}
                _hover={{ opacity: 0.7 }}
              >
                <Flex
                  alignItems={"center"}
                  gap={"16px"}
                  borderBottom={"1px solid"}
                  borderColor={"secondary.100.light"}
                  pb={"16px"}
                >
                  <Image
                    width={"56px"}
                    height={"56px"}
                    borderRadius={"50%"}
                    src={item.imageUrl}
                    draggable={false}
                  />
                  <Flex flexDir={"column"}>
                    <Text
                      color={"secondary.950.light"}
                      fontWeight={600}
                      fontSize={"18px"}
                    >
                      {item.name}
                    </Text>
                    <Text
                      color={"secondary.500.light"}
                      fontWeight={400}
                      fontSize={"14px"}
                    >
                      {item.branch}
                    </Text>
                  </Flex>
                </Flex>
                <Text
                  color={"secondary.600.light"}
                  fontSize={"14px"}
                  mt={"16px"}
                >
                  {item.description}
                </Text>
              </Flex>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default PartnersInImpact;
