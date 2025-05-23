"use client";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import profile from "@repo/ui/assets/profile.png";
import sliderProfile from "@repo/ui/assets/home-slider-photo.webp";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperMain, SwiperSlide } from "swiper/react";
import { PaginationOptions, Swiper } from "swiper/types";
import { useRouter } from "next/navigation";
// import StarIcon from "@repo/ui/components/icons/StarIcon";
import LocationIcon from "@repo/ui/components/icons/LocationIcon";
import { colors } from "@repo/ui/theme";

const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;

const providerGroupAData = [
  {
    name: "Hanna Morrell",
    specialty: "Mental Health",
    location: "New York, United States",
    reviews: "(120 reviews)",
    evaluationScore: "5",
    image: profile.src,
  },
  {
    name: "Christy Chadwick",
    specialty: "Coach",
    location: "Berlin, Germany",
    reviews: "(110 reviews)",
    evaluationScore: "4.5",
    image: profile.src,
  },
  {
    name: "John Doe",
    specialty: "Nutritionist",
    location: "Los Angeles, United States",
    reviews: "(50 reviews)",
    evaluationScore: "5",
    image: profile.src,
  },
];

const providerGroupBData = [
  {
    name: "Alice Smith",
    specialty: "Psychologist",
    location: "Toronto, Canada",
    reviews: "(210 reviews)",
    evaluationScore: "4.9",
    image: profile.src,
  },
  {
    name: "Mike Johnson",
    specialty: "Fitness Trainer",
    location: "Sydney, Australia",
    reviews: "(220 reviews)",
    evaluationScore: "4.6",
    image: profile.src,
  },
  {
    name: "Sarah Brown",
    specialty: "Dietitian",
    location: "London, UK",
    reviews: "(10 reviews)",
    evaluationScore: "4.8",
    image: profile.src,
  },
];

const providerGroupCData = [
  {
    name: "Emma Wilson",
    specialty: "Life Coach",
    location: "Paris, France",
    reviews: "(121 reviews)",
    evaluationScore: "4.5",
    image: profile.src,
  },
  {
    name: "David Lee",
    specialty: "Personal Trainer",
    location: "Rome, Italy",
    reviews: "(230 reviews)",
    evaluationScore: "4.9",
    image: profile.src,
  },
  {
    name: "Olivia Taylor",
    specialty: "Health Coach",
    location: "Madrid, Spain",
    reviews: "(90 reviews)",
    evaluationScore: "4.4",
    image: profile.src,
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
          transition: all 0.3s;
        ">
      </div>`;
    }

    return `<div style="display:flex; justify-content: center; align-items: center; gap:8px;">${element}</div>`;
  },
};

const TopRankedProviders = () => {
  const router = useRouter();
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
          justifyContent="center"
          px={4}
          mb={6}
        >
          <Text
            fontSize={{ base: "24px", lg: "30px" }}
            fontWeight="700"
            lineHeight={{ base: "36px", lg: "45px" }}
            color={"#1A202C"}
          >
            Top-Ranked Providers
          </Text>
        </Flex>
        <SwiperMain
          slidesPerView={1}
          centeredSlides
          spaceBetween={8}
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
          <SwiperSlide className="trusted-swiper-slide">
            <Flex
              gap={6}
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
            >
              {providerGroupAData.map((item, index) => {
                if (index === 0) {
                  return (
                    <Flex
                      key={index}
                      border={"1px solid #E2E8F0"}
                      borderRadius={"16px"}
                      flexDir={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={{
                        base: "8px",
                        md: "8px",
                        lg: "16px 12px",
                        xl: "24px",
                      }}
                      bg={"primary.500.light"}
                      textAlign="center"
                      gap={{ base: "16px", md: "32px" }}
                      minW={{
                        base: "200px",
                        md: "310px",
                        lg: "550px",
                        xl: "650px",
                      }}
                    >
                      <Box color={"base.white.light"}>
                        <Flex justifyContent={"center"} alignItems={"baseline"}>
                          <Text
                            fontSize={{ base: "18px", md: "20px" }}
                            fontWeight={500}
                            mr={"2px"}
                          >
                            With
                          </Text>
                          <Text
                            fontSize={{ base: "20px", md: "24px" }}
                            fontWeight={600}
                          >
                            TeleWellness Hub,
                          </Text>
                        </Flex>
                        <Text
                          fontSize={{ base: "18px", md: "20px" }}
                          fontWeight={500}
                          maxW={{ base: "300px", md: "400px", lg: "500px" }}
                        >
                          Get an Appointment from the Best Specialists online.
                        </Text>
                      </Box>
                      <Image
                        src={sliderProfile.src}
                        alt="slider profile"
                        maxW={"210px"}
                        height={"auto"}
                      />
                      <Button
                        type="button"
                        border={"1px solid"}
                        borderColor={"base.white.light"}
                        borderRadius={"8px"}
                        bg={"transparent"}
                        color={"base.white.light"}
                        _hover={{
                          bg: "base.white.light",
                          color: "primary.500.light",
                        }}
                        _active={{
                          bg: "base.white.light",
                          color: "primary.500.light",
                        }}
                        onClick={() => {
                          router.push(directoryUrl as string);
                        }}
                      >
                        View all Experts
                      </Button>
                    </Flex>
                  );
                } else {
                  return (
                    <Flex
                      key={index}
                      flexDir={"column"}
                      border={"1px solid"}
                      borderColor={"secondary.100.light"}
                      bg={"base.white.light"}
                      p={{
                        base: "8px",
                        md: "8px",
                        lg: "16px 12px",
                        xl: "24px",
                      }}
                      textAlign="center"
                      width={{ base: "100%", md: "300px" }}
                      padding={"24px"}
                      gap={{ base: "8px", md: "16px" }}
                      borderRadius={"24px"}
                      opacity={"0px"}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        w={"80px"}
                        h={"80px"}
                        borderRadius="50%"
                        mx="auto"
                      />
                      <Text
                        fontSize="16px"
                        fontWeight="600"
                        color={"secondary.950.light"}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight={400}
                        color={"secondary.500.light"}
                      >
                        {item.specialty}
                      </Text>
                      {/* <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={"4px"}
                      >
                        <StarIcon svg={{ width: "16px", height: "16px" }} />
                        <Text
                          fontSize="12px"
                          fontWeight={500}
                          color={"grayScale.950.light"}
                        >
                          {item.evaluationScore}
                        </Text>
                        <Text
                          fontSize="12px"
                          fontWeight={500}
                          color={"grayScale.500.light"}
                        >
                          {item.reviews}
                        </Text>
                      </Flex> */}
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={"4px"}
                        whiteSpace={"nowrap"}
                      >
                        <LocationIcon svg={{ width: "16px", height: "16px" }} />
                        <Text
                          fontSize="12px"
                          fontWeight={400}
                          color={"secondary.500.light"}
                        >
                          {item.location}
                        </Text>
                      </Flex>
                      <Button
                        type="button"
                        bg={"base.white.light"}
                        border={"1px solid"}
                        borderColor={"primary.500.light"}
                        color={"primary.500.light"}
                        fontWeight={600}
                        fontSize={"14px"}
                        _hover={{
                          bg: "primary.500.light",
                          color: "base.white.light",
                        }}
                        _active={{
                          bg: "primary.500.light",
                          color: "base.white.light",
                        }}
                      >
                        Book Appointment
                      </Button>
                    </Flex>
                  );
                }
              })}
            </Flex>
          </SwiperSlide>
          <SwiperSlide className="trusted-swiper-slide">
            <Flex
              gap={6}
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
            >
              {providerGroupBData.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    flexDir={"column"}
                    border={"1px solid"}
                    borderColor={"secondary.100.light"}
                    bg={"base.white.light"}
                    p={{
                      base: "8px",
                      md: "8px",
                      lg: "16px 12px",
                      xl: "24px",
                    }}
                    textAlign="center"
                    width={{ base: "100%", md: "300px" }}
                    padding={"24px"}
                    gap={{ base: "8px", md: "16px" }}
                    borderRadius={"24px"}
                    opacity={"0px"}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      w={"80px"}
                      h={"80px"}
                      borderRadius="50%"
                      mx="auto"
                    />
                    <Text
                      fontSize="16px"
                      fontWeight="600"
                      color={"secondary.950.light"}
                    >
                      {item.name}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight={400}
                      color={"secondary.500.light"}
                    >
                      {item.specialty}
                    </Text>
                    {/* <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"4px"}
                    >
                      <StarIcon svg={{ width: "16px", height: "16px" }} />
                      <Text
                        fontSize="12px"
                        fontWeight={500}
                        color={"grayScale.950.light"}
                      >
                        {item.evaluationScore}
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight={500}
                        color={"grayScale.500.light"}
                      >
                        {item.reviews}
                      </Text>
                    </Flex> */}
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"4px"}
                      whiteSpace={"nowrap"}
                    >
                      <LocationIcon svg={{ width: "16px", height: "16px" }} />
                      <Text
                        fontSize="12px"
                        fontWeight={400}
                        color={"secondary.500.light"}
                      >
                        {item.location}
                      </Text>
                    </Flex>
                    <Button
                      type="button"
                      bg={"base.white.light"}
                      border={"1px solid"}
                      borderColor={"primary.500.light"}
                      color={"primary.500.light"}
                      fontWeight={600}
                      fontSize={"14px"}
                      _hover={{
                        bg: "primary.500.light",
                        color: "base.white.light",
                      }}
                      _active={{
                        bg: "primary.500.light",
                        color: "base.white.light",
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Flex>
                );
              })}
            </Flex>
          </SwiperSlide>
          <SwiperSlide className="trusted-swiper-slide">
            <Flex
              gap={6}
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
            >
              {providerGroupCData.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    flexDir={"column"}
                    border={"1px solid"}
                    borderColor={"secondary.100.light"}
                    bg={"base.white.light"}
                    p={{
                      base: "8px",
                      md: "8px",
                      lg: "16px 12px",
                      xl: "24px",
                    }}
                    textAlign="center"
                    width={{ base: "100%", md: "300px" }}
                    padding={"24px"}
                    gap={{ base: "8px", md: "16px" }}
                    borderRadius={"24px"}
                    opacity={"0px"}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      w={"80px"}
                      h={"80px"}
                      borderRadius="50%"
                      mx="auto"
                    />
                    <Text
                      fontSize="16px"
                      fontWeight="600"
                      color={"secondary.950.light"}
                    >
                      {item.name}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight={400}
                      color={"secondary.500.light"}
                    >
                      {item.specialty}
                    </Text>
                    {/* <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"4px"}
                    >
                      <StarIcon svg={{ width: "16px", height: "16px" }} />
                      <Text
                        fontSize="12px"
                        fontWeight={500}
                        color={"grayScale.950.light"}
                      >
                        {item.evaluationScore}
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight={500}
                        color={"grayScale.500.light"}
                      >
                        {item.reviews}
                      </Text>
                    </Flex> */}
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"4px"}
                      whiteSpace={"nowrap"}
                    >
                      <LocationIcon svg={{ width: "16px", height: "16px" }} />
                      <Text
                        fontSize="12px"
                        fontWeight={400}
                        color={"secondary.500.light"}
                      >
                        {item.location}
                      </Text>
                    </Flex>
                    <Button
                      type="button"
                      bg={"base.white.light"}
                      border={"1px solid"}
                      borderColor={"primary.500.light"}
                      color={"primary.500.light"}
                      fontWeight={600}
                      fontSize={"14px"}
                      _hover={{
                        bg: "primary.500.light",
                        color: "base.white.light",
                      }}
                      _active={{
                        bg: "primary.500.light",
                        color: "base.white.light",
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Flex>
                );
              })}
            </Flex>
          </SwiperSlide>
        </SwiperMain>
      </Box>
    </Box>
  );
};

export default TopRankedProviders;
