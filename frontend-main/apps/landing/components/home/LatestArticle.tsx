"use client";
import { Text, Box, Flex, Image, Button } from "@chakra-ui/react";
import Slider from "@repo/ui/components/custom-slider/Slider";
import { articles } from "@repo/ui/constants/constant";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import peopleMedical from "@repo/ui/assets/latesarticles/image.png";
import { useRouter } from "next/navigation";

const LatestArticle = () => {
  const router = useRouter();

  return (
    <Box w={"100%"}>
      <Box
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
      >
        <Slider
          navigationButtonTopSideComponent={
            <Button
              type="button"
              border={"1px solid"}
              borderColor={"primary.500.light"}
              backgroundColor={"transparent"}
              color={"primary.500.light"}
              fontWeight={600}
              padding={{ base: "0px 8px", md: "0px 16px" }}
              fontSize={{ base: "14px", md: "16px" }}
              _hover={{ bg: "base.white.light" }}
              onClick={() => {
                router.push("/blog");
              }}
            >
              View all posts
            </Button>
          }
          sliderTitleComponent={
            <>
              <Text
                fontSize={{ base: "24px", md: "30px" }}
                fontWeight={700}
                color="secondary.950.light"
                mb={{ base: "4px", md: "12px" }}
              >
                Latest Articles in Health Magazine
              </Text>
              <Text
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight={400}
                color="secondary.600.light"
                mb={{ base: "8px", sm: "0px" }}
              >
                The latest news, technologies, and resources from our team.
              </Text>
            </>
          }
        >
          {articles.map((item) => {
            return (
              <Flex
                minW={{ base: "276px", md: "380px" }}
                width={{ base: "276px", md: "380px" }}
                maxW={{ base: "276px", md: "380px" }}
                flexDirection={"column"}
                cursor={"pointer"}
                transitionDuration={"300ms"}
                _hover={{ opacity: 0.7 }}
              >
                <Image src={item.imageUrl} draggable={false} />
                <Text
                  fontWeight={600}
                  fontSize={"14px"}
                  color={"primary.600.light"}
                  mt={"12px"}
                >
                  Desing
                </Text>
                <Flex
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  fontWeight={600}
                  color={"secondary.950.light"}
                  fontSize={{ base: "20px", md: "24px" }}
                  my={{ base: "6px", md: "12px" }}
                >
                  {item.title}
                  <Box width={"24px"} height={"24px"}>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L11 1M11 1H1M11 1V11"
                        stroke="#182734"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Box>
                </Flex>
                <Text
                  fontWeight={400}
                  fontSize={"16px"}
                  color={"secondary.600.light"}
                >
                  {item.description}
                </Text>
                <Flex gap={"12px"} mt={"12px"}>
                  <Image
                    src={peopleMedical.src}
                    width={"40px"}
                    height={"40px"}
                  />
                  <Flex flexDirection={"column"} gap={"4px"}>
                    <Text
                      fontWeight={600}
                      fontSize={"14px"}
                      color={"text.secomdary.950.light"}
                    >
                      Natali Craig
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"secondary.600.light"}
                      fontWeight={400}
                    >
                      {item.date}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default LatestArticle;
