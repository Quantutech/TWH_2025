"use client";
import { Box, Flex, Image, Text, useBreakpoint } from "@chakra-ui/react";
import { Swiper as SwiperMain, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { PaginationOptions, Swiper } from "swiper/types";
import { specialties } from "@repo/ui/constants/constant";
import { colors } from "@repo/ui/theme";
import { webUrls } from "@repo/ui/config/router-config";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

    return `<div style="display:flex; justify-content: center; align-items: center; gap:8px;">${element}</div>`;
  },
};

const TopSearchedSpecialtiesSlider = () => {
  const currentBreakpoint = useBreakpoint();
  const router = useRouter();

  const slidesPerViewEdit = useMemo(() => {
    if (currentBreakpoint === "2xl") {
      return 5;
    } else if (currentBreakpoint === "xl") {
      return 5;
    } else if (currentBreakpoint === "lg") {
      return 4;
    } else if (currentBreakpoint === "md") {
      return 3;
    } else if (currentBreakpoint === "sm") {
      return 3;
    } else if (currentBreakpoint === "base") {
      return 3;
    }
    return 7;
  }, [currentBreakpoint]);

  return (
    <Box mt={10} w={"100%"} gap={"24px"} bg={"base.white.light"}>
      <Box
        maxW={"1440px"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        margin={"auto"}
      >
        <Flex justify="space-between" align="center" mb={5}>
          <Box
            w={{ base: "259px", lg: "388px" }}
            h={{ base: "30px", lg: "45px" }}
          >
            <Text
              fontSize={{ base: "16px", lg: "30px" }}
              fontWeight="700"
              lineHeight={{ base: "20px", lg: "45px" }}
              color={"secondary.950.light"}
            >
              Top Searched Specialties
            </Text>
          </Box>
        </Flex>
        <SwiperMain
          slidesPerView={slidesPerViewEdit}
          slidesPerGroup={slidesPerViewEdit}
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
          {specialties.map((specialty, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                const url = new URL(
                  webUrls.directory as string,
                  window.location.origin
                );

                url.searchParams.set(
                  "specialtyValue",
                  specialty?.value?.toString() || ""
                );
                url.searchParams.set(
                  "specialtyLabel",
                  specialty?.title?.toString() || ""
                );
                router.push(url.href);
              }}
            >
              <Flex direction="column" align="center" justify="center" gap={2}>
                <Image src={specialty.icon} alt="icon" h="96px" w="96px" />
              </Flex>
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap={2}
                mt={2}
              >
                <Text textAlign={"center"} fontSize={"16px"} fontWeight={"500"}>
                  {specialty.title}
                </Text>
              </Flex>
            </SwiperSlide>
          ))}
        </SwiperMain>
      </Box>
    </Box>
  );
};

export default TopSearchedSpecialtiesSlider;
