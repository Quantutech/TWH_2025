"use client";
import { Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import banner from "@repo/ui/assets/provider-benefits/banner.webp";
import ExpertColleagueIcon from "@repo/ui/components/icons/ExpertColleagueIcon";
import GeoLocationIcon from "@repo/ui/components/icons/GeoLocationIcon";
import PageViewsIcon from "@repo/ui/components/icons/PageViewsIcon";

const AreUProvider = () => {
  return (
    <HStack
      maxW={"1440px"}
      marginX={"auto"}
      justifyContent={"space-between"}
      spacing={"32px"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      flexWrap={{ base: "wrap", lg: "nowrap" }}
    >
      <VStack
        w={{ base: "100%", lg: "50%" }}
        gap={{ base: "12px", lg: "132px" }}
        alignItems={"flex-start"}
      >
        <VStack alignItems="flex-start" spacing={{ base: "12px", md: "16px" }}>
          <Text
            fontWeight="500"
            fontSize="16px"
            lineHeight="30px"
            color={"primary.600.light"}
          >
            Provider Benefits
          </Text>
          <Text
            fontWeight="700"
            fontSize={{ base: "24px", lg: "36px" }}
            lineHeight={{ base: "36px", lg: "54px" }}
            color={"secondary.950.light"}
          >
            Empower Your Practice, Thrive, and Make an Impact
          </Text>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="24px"
            color="secondary.600.light"
          >
            Built by providers, for Providers - TeleWellness Hub helps you grow,
            earn, and connect like never before
          </Text>
          <Button
            h="48px"
            w="187px"
            justifyContent="center"
            border="1px solid"
            borderColor={"secondary.900.light"}
            borderRadius="8px"
            fontWeight="600"
            fontSize="16px"
            color="base.white.light"
            bg="secondary.900.light"
            _hover={{ bg: "secondary.50.light", color: "secondary.900.light" }}
          >
            Get Started Today
          </Button>
        </VStack>
        <Flex
          display={{ base: "none", lg: "flex" }}
          width={"100%"}
          gap={{ base: "16px", md: "16px", xl: "24px" }}
          flexWrap={"nowrap"}
          justifyContent={"flex-start"}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            width={"200px"}
            height={"180px"}
            maxHeight={"180px"}
            bg={"base.white.light"}
            borderRadius={"24px"}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            padding={"24px 16px"}
            gap={"10px"}
          >
            <ExpertColleagueIcon
              svg={{
                width: "42px",
                height: "42px",
                style: {
                  minWidth: "42px",
                  maxWidth: "42px",
                  minHeight: "42px",
                  maxHeight: "42px",
                },
              }}
            />
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"4px"}
            >
              <Text
                fontWeight={"600"}
                fontSize={{ base: "18px", md: "20px", xl: "24px" }}
                color={"secondary.950.light"}
              >
                24/7
              </Text>
              <Text
                fontWeight={"500"}
                fontSize={"14px"}
                color={"secondary.500.light"}
                textAlign={"center"}
                whiteSpace={"nowrap"}
              >
                Earn while you're offline
              </Text>
            </Flex>
          </Flex>

          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            width={"200px"}
            height={"180px"}
            maxHeight={"180px"}
            bg={"base.white.light"}
            borderRadius={"24px"}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            padding={"24px 16px"}
            gap={"10px"}
          >
            <PageViewsIcon
              svg={{
                width: "42px",
                height: "42px",
                style: {
                  minWidth: "42px",
                  maxWidth: "42px",
                  minHeight: "42px",
                  maxHeight: "42px",
                },
              }}
            />
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"4px"}
            >
              <Text
                fontWeight={"600"}
                fontSize={{ base: "18px", md: "20px", xl: "24px" }}
                color={"secondary.950.light"}
                whiteSpace={"nowrap"}
              >
                1 Platform
              </Text>
              <Text
                fontWeight={"500"}
                fontSize={"14px"}
                color={"secondary.500.light"}
                textAlign={"center"}
              >
                Everything you need to grow
              </Text>
            </Flex>
          </Flex>

          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            width={"200px"}
            height={"180px"}
            maxHeight={"180px"}
            bg={"base.white.light"}
            borderRadius={"24px"}
            border={"1px solid"}
            borderColor={"secondary.100.light"}
            padding={"24px 16px"}
            gap={"10px"}
          >
            <GeoLocationIcon
              svg={{
                width: "42px",
                height: "42px",
                style: {
                  minWidth: "42px",
                  maxWidth: "42px",
                  minHeight: "42px",
                  maxHeight: "42px",
                },
              }}
            />
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"4px"}
            >
              <Text
                fontWeight={"600"}
                fontSize={{ base: "18px", md: "20px", xl: "24px" }}
                color={"secondary.950.light"}
                whiteSpace={"nowrap"}
              >
                100% Yours
              </Text>
              <Text
                fontWeight={"500"}
                fontSize={"14px"}
                color={"secondary.500.light"}
                textAlign={"center"}
              >
                Keep full control of your practice
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </VStack>
      <Image
        src={banner.src}
        alt="banner"
        maxW={{
          base: "100%",
          sm: "100%",
          md: "100%",
          lg: "450px",
          xl: "560px",
        }}
        height={"auto"}
        mx={{ base: "auto", lg: "0px" }}
      />
      <Flex
        display={{ base: "flex", lg: "none" }}
        width={"100%"}
        gap={"8px"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          width={"126px"}
          height={"144px"}
          maxHeight={"144px"}
          bg={"base.white.light"}
          borderRadius={"24px"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"16px 8px"}
          gap={"10px"}
        >
          <ExpertColleagueIcon
            svg={{
              width: "36px",
              height: "36px",
              style: {
                minWidth: "36px",
                maxWidth: "36px",
                minHeight: "36px",
                maxHeight: "36px",
              },
            }}
          />
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"4px"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              color={"secondary.950.light"}
              whiteSpace={"nowrap"}
            >
              24/7
            </Text>
            <Text
              fontWeight={"500"}
              fontSize={"12px"}
              color={"secondary.500.light"}
              textAlign={"center"}
            >
              Earn while you're offline
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          width={"126px"}
          height={"144px"}
          maxHeight={"144px"}
          bg={"base.white.light"}
          borderRadius={"24px"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"16px 8px"}
          gap={"10px"}
        >
          <PageViewsIcon
            svg={{
              width: "36px",
              height: "36px",
              style: {
                minWidth: "36px",
                maxWidth: "36px",
                minHeight: "36px",
                maxHeight: "36px",
              },
            }}
          />
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"4px"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              color={"secondary.950.light"}
              whiteSpace={"nowrap"}
            >
              1 Platform
            </Text>
            <Text
              fontWeight={"500"}
              fontSize={"12px"}
              color={"secondary.500.light"}
              textAlign={"center"}
            >
              Everything you need to grow
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          width={"126px"}
          height={"144px"}
          maxHeight={"144px"}
          bg={"base.white.light"}
          borderRadius={"24px"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"16px 8px"}
          gap={"10px"}
        >
          <GeoLocationIcon
            svg={{
              width: "36px",
              height: "36px",
              style: {
                minWidth: "36px",
                maxWidth: "36px",
                minHeight: "36px",
                maxHeight: "36px",
              },
            }}
          />
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"4px"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              color={"secondary.950.light"}
              whiteSpace={"nowrap"}
            >
              100% Yours
            </Text>
            <Text
              fontWeight={"500"}
              fontSize={"12px"}
              color={"secondary.500.light"}
              textAlign={"center"}
            >
              Keep full control of your practice
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default AreUProvider;
