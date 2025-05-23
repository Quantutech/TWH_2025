"use client";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import banner1 from "@repo/ui/assets/blog/items/1.png";
import people2 from "@repo/ui/assets/blog/people/2.png";
import Slider from "@repo/ui/components/custom-slider/Slider";
import { colors } from "@repo/ui/theme";
import { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";

const PODCASTS = [
  {
    id: 1,
    category: "Mental Health Awareness",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.F",
    bannerImage: banner1.src,
    peopleImage: people2.src,
    fullName: "Candice Wu",
    date: "15 Jan 2024",
  },
  {
    id: 2,
    category: "Mental Health Awareness",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    bannerImage: banner1.src,
    peopleImage: people2.src,
    fullName: "Natali Craig",
    date: "14 Jan 2024",
  },
  {
    id: 3,
    category: "Mental Health Awareness",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    bannerImage: banner1.src,
    peopleImage: people2.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
  {
    id: 4,
    category: "Mental Health Awareness",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    bannerImage: banner1.src,
    peopleImage: people2.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
  {
    id: 5,
    category: "Mental Health Awareness",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    bannerImage: banner1.src,
    peopleImage: people2.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
];

const ReadyTune: FC = () => {
  return (
    <Box bg={"base.white.light"} w={"100%"}>
      <Box
        w={"100%"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        gap={"48px"}
        maxW={"1440px"}
        margin={"auto"}
      >
        <Slider
          navigationButtonTopSideComponent={
            <Button
              type="button"
              border={"1px solid"}
              borderColor={"primary.600.light"}
              backgroundColor={"transparent"}
              color={"primary.600.light"}
              fontWeight={600}
              fontSize={"16px"}
              mt={{ base: "8px", md: "0px" }}
            >
              View all podcasts
            </Button>
          }
          sliderTitleComponent={
            <>
              <Text
                fontSize="30px"
                fontWeight={700}
                color="secondary.950.light"
                mb="16px"
              >
                Ready to Tune In?
              </Text>
              <Text
                fontSize="20px"
                fontWeight={400}
                color="secondary.600.light"
              >
                Start listening today and explore the incredible expertise
                waiting for you!
              </Text>
            </>
          }
        >
          {PODCASTS.map((item) => {
            return (
              <Flex
                minW={{
                  base: "292px",
                  sm: "300px",
                  md: "320px",
                  lg: "340px",
                  xl: "360px",
                  "2xl": "384px",
                }}
                width={{
                  base: "292px",
                  sm: "300px",
                  md: "320px",
                  lg: "340px",
                  xl: "360px",
                  "2xl": "384px",
                }}
                maxW={{
                  base: "292px",
                  sm: "300px",
                  md: "320px",
                  lg: "340px",
                  xl: "360px",
                  "2xl": "384px",
                }}
                flexDirection={"column"}
                cursor={"pointer"}
                transitionDuration={"300ms"}
                _hover={{ opacity: 0.7 }}
              >
                <Image src={item.bannerImage} draggable={false} />
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
                  fontSize={"24px"}
                  my={"12px"}
                >
                  {item.title}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke={colors.secondary["950"].light}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
                    src={item.peopleImage}
                    alt={"people"}
                    width="40px"
                    height="40px"
                    borderRadius="full"
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

export default ReadyTune;
