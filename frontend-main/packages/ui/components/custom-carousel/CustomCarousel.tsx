"use client";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { colors } from "../../theme";

interface Props {
  carouselItems: {
    id: number;
    imageSrc: string;
    alt: string;
    description: string;
    name: string;
    title: string;
    role: string;
    evaluationScore: number;
  }[];
}

const CustomCarousel = ({ carouselItems }: Props) => {
  const defaultWidth = 596;
  const defaultHeight = 736;
  const [imageWidth, setImageWidth] = useState<number>(defaultWidth);
  const [imageHeight, setImageHeight] = useState<number>(defaultHeight);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const updateImageSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1280) {
        setImageWidth(Math.round(defaultWidth - defaultWidth * 0.3));
        setImageHeight(Math.round(defaultHeight - defaultHeight * 0.3));
      } else if (screenWidth <= 1400) {
        setImageWidth(Math.round(defaultWidth - defaultWidth * 0.2));
        setImageHeight(Math.round(defaultHeight - defaultHeight * 0.2));
      } else if (screenWidth <= 1550) {
        setImageWidth(Math.round(defaultWidth - defaultWidth * 0.1));
        setImageHeight(Math.round(defaultHeight - defaultHeight * 0.1));
      } else {
        setImageWidth(defaultWidth);
        setImageHeight(defaultHeight);
      }
    };

    window.addEventListener("resize", updateImageSize);
    updateImageSize();

    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % carouselItems?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems?.length]);

  return (
    <Flex
      w={`${imageWidth}px`}
      maxW={`${imageWidth}px`}
      h={`${imageHeight}px`}
      maxH={`${imageHeight}px`}
      gap={"0px"}
      alignItems={"center"}
      overflow={"hidden"}
      position={"relative"}
    >
      {carouselItems.map((item) => {
        return (
          <Box
            key={item.id}
            transform={`translateX(-${imageWidth * imageIndex}px)`}
            transition={"transform 0.5s ease-in-out"}
            bg={"transparent"}
            flexShrink={0}
          >
            <Image
              src={item.imageSrc}
              w={`${imageWidth}px`}
              h={`${imageHeight}px`}
              minWidth={"200px"}
              draggable={false}
              borderRadius={"20px"}
              zIndex={-1}
            />
            <Flex
              mt={{ lg: "-200px", "2xl": "-290px" }}
              h={{ lg: "200px", "2xl": "290px" }}
              flexDir={"column"}
              color={"base.white.light"}
              transition={"none"}
              width={`${imageWidth}px`}
              backdropFilter={"blur(5px)"}
              background={"rgba(255, 255, 255, 0.3)"}
              borderTop={"1px solid"}
              borderColor={"base.white.light"}
              padding={{ lg: "16px", "2xl": "32px" }}
              borderBottomRadius={"20px"}
              zIndex={10}
            >
              <Text
                fontWeight={600}
                fontSize={{ lg: "16px", "2xl": "28px" }}
                lineHeight={{ lg: "auto", "2xl": "28px" }}
                mb={{ lg: "8px", "2xl": "32px" }}
              >
                {item.description}
              </Text>
              <Flex
                justifyContent={"space-between"}
                fontWeight={600}
                fontSize={{ lg: "20px", "2xl": "34px" }}
                mb={{ lg: "4px", "2xl": "12px" }}
              >
                {item.name}
                <Flex>
                  <Flex gap={"8px"}>
                    {Array.from(
                      { length: item.evaluationScore },
                      (_, index) => (
                        <svg
                          key={index}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1642_112)">
                            <g clipPath="url(#clip1_1642_112)">
                              <path
                                d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
                                fill={colors.base.white.light}
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_1642_112">
                              <rect
                                width="20"
                                height="20"
                                fill={colors.base.white.light}
                              />
                            </clipPath>
                            <clipPath id="clip1_1642_112">
                              <rect
                                width="20"
                                height="20"
                                fill={colors.base.white.light}
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      )
                    )}
                  </Flex>
                </Flex>
              </Flex>
              <Text
                fontWeight={600}
                fontSize={{ lg: "16px", "2xl": "18px" }}
                mb={"4px"}
              >
                {item.title}
              </Text>
              <Text fontWeight={600} fontSize={{ lg: "14px", "2xl": "16px" }}>
                {item.role}
              </Text>
            </Flex>
          </Box>
        );
      })}
      <Flex
        transition={"none"}
        position={"absolute"}
        right={{ lg: "16px", "2xl": "32px" }}
        bottom={{ lg: "16px", "2xl": "32px" }}
      >
        <Box
          onClick={() => {
            setImageIndex((prev) => {
              if (prev === 0) {
                return carouselItems?.length - 1;
              }
              return prev - 1;
            });
          }}
          w={{ lg: "40px", "2xl": "56px" }}
          h={{ lg: "40px", "2xl": "56px" }}
          borderRadius={"50%"}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          marginRight={"16px"}
          _hover={{ backgroundColor: "grayScale.500.light" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke={colors.base.white.light}
              strokeOpacity="0.5"
            />
            <path
              d="M35 28H21M21 28L28 35M21 28L28 21"
              stroke={colors.base.white.light}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Box
          onClick={() => {
            setImageIndex((prev) => {
              if (prev === carouselItems?.length - 1) {
                return 0;
              }
              return prev + 1;
            });
          }}
          w={{ lg: "40px", "2xl": "56px" }}
          h={{ lg: "40px", "2xl": "56px" }}
          borderRadius={"50%"}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ backgroundColor: "grayScale.500.light" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke={colors.base.white.light}
              strokeOpacity="0.5"
            />
            <path
              d="M21 28H35M35 28L28 21M35 28L28 35"
              stroke={colors.base.white.light}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CustomCarousel;
