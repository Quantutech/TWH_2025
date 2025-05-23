"use client";
import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import sandhya from "@repo/ui/assets/landing/home-page/trusted-experts/sandhya.webp";
import leo from "@repo/ui/assets/landing/home-page/trusted-experts/leo.webp";
import sarah from "@repo/ui/assets/landing/home-page/trusted-experts/sarah.webp";
import { Swiper as SwiperMain, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { PaginationOptions, Swiper } from "swiper/types";
import { colors } from "@repo/ui/theme";

const specialties = [
  {
    name: "Sandhya Nagabhusha",
    professionalTitle: "LPC, CAC II, EMDR",
    content:
      "TeleWellness Hub has made a huge and transformative impact in the lives of our clients that we serve! I am proud to be part of this network of exceptional providers!",
    image: sandhya.src,
  },
  {
    name: "LEO MASSEY",
    professionalTitle: "LMSW",
    content:
      "Again I cannot tell you how amazing of an opportunity this was. I had such a great time and really appreciate it. Thank you so much, Marta!",
    image: leo.src,
  },
  {
    name: "Sarah Schmidt",
    professionalTitle: "Joyful Valley Coaching",
    content:
      "It was a surreal experience to drive to work listening to my own podcast episode – a dream come true! Thank you again, I so appreciate you.",
    image: sarah.src,
  },
];

const pagination: PaginationOptions = {
  clickable: true,
  type: "custom",
  renderCustom: function (
    swiper: Swiper,
    current: number,
    total: number
  ): string {
    let element: string = "";

    for (let i = 0; i < total; i++) {
      element += `
      <div
        data-index="${i}"
        style="
          min-width: ${i === current - 1 ? "32px" : "8px"};
          width: ${i === current - 1 ? "32px" : "8px"};
          min-height: 8px;
          height: 8px;
          background-color: ${i === current - 1 ? `${colors.secondary["700"].light}` : `${colors.secondary["200"].light}`};
          border-radius: ${i === current - 1 ? "14px" : "50%"};
          cursor: pointer;
          transition: all 3s;
        ">
      </div>`;
    }

    return `<div style="display:flex; justify-content: center; align-items: center; gap:8px; margin-top: -10px">${element}</div>`;
  },
};

const TrustedExperts = () => {
  return (
    <Box w={"100%"} gap={"24px"} bg={"base.white.light"}>
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
        <Flex
          align="center"
          textAlign={"center"}
          pb={4}
          justifyContent="center"
          px={4}
        >
          <Text
            fontSize={{ base: "24px", lg: "30px" }}
            fontWeight="700"
            lineHeight={{ base: "36px", lg: "45px" }}
            color={"secondary.950.light"}
          >
            Trusted by Experts, Loved by Clients
          </Text>
        </Flex>
        <SwiperMain
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={1}
          pagination={pagination}
          modules={[Pagination]}
          onSwiper={(swiper) => {
            const addClickListeners = () => {
              const customPagination = swiper.pagination.el;
              if (customPagination) {
                customPagination.addEventListener("click", (e) => {
                  const target = e.target as HTMLElement;
                  const index = target?.dataset.index;

                  if (index !== undefined) {
                    swiper.slideTo(Number(index));
                  }
                });
              }
            };
            addClickListeners();
            swiper.on("paginationRender", addClickListeners);
          }}
          className="swiper-container"
        >
          {specialties.map((specialty, index) => (
            <SwiperSlide key={index} className="trusted-swiper-slide">
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap={3}
                margin={"auto"}
                border={"1px solid"}
                borderColor={"secondary.100.light"}
                bg={"secondary.50.light"}
                borderRadius={"24px"}
                padding={"8px"}
                h={{ base: "344px", lg: "313px" }}
              >
                <HStack>
                  <Box
                    justifyContent={"center"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <Image
                      src={specialty.image}
                      alt={specialty.name}
                      h={"66px"}
                      w={"66px"}
                      borderRadius={"50%"}
                    />
                  </Box>
                  <VStack alignItems={"flex-start"} gap={"0px"}>
                    <Text
                      fontSize={"18px"}
                      fontWeight={"600"}
                      lineHeight={"27px"}
                    >
                      {specialty.name}
                    </Text>
                    <Text
                      fontWeight={"400"}
                      fontSize={"14px"}
                      lineHeight={"21px"}
                      color={"secondary.500.light"}
                    >
                      {specialty.professionalTitle}
                    </Text>
                  </VStack>
                </HStack>

                <Text
                  maxW={"790px"}
                  textAlign={"center"}
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight={{ base: "24px", lg: "27px" }}
                  color={"grayScale.500.light"}
                >
                  "{specialty.content}"
                </Text>
              </Flex>
            </SwiperSlide>
          ))}
        </SwiperMain>
      </Box>
    </Box>
  );
};

export default TrustedExperts;
