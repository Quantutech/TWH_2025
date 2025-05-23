"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { annualPlans, mounthlyPlans } from "@repo/ui/constants/constant";
import CheckIcon from "@repo/ui/components/icons/CheckIcon";
import AngleDownIcon from "@repo/ui/components/icons/AngleDownIcon";
import { subscribePlan } from "@repo/ui/utils/api";
import { getCookie } from "@repo/ui/utils/storage";
import { useRouter } from "next/navigation";

interface Props {
  selectBilling: "monthly" | "annual";
}

const PlanBox = ({ selectBilling }: Props) => {
  const [isOpenAllFeatures, setIsOpenAllFeatures] = useState({
    isOpen: false,
    key: "",
  });
  const toast = useToast();
  const router = useRouter();
  const activePlans = useMemo(() => {
    return selectBilling === "monthly" ? mounthlyPlans : annualPlans;
  }, [selectBilling]);
  const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;
  const handleSubscribe = async (planKey: string) => {
    // const token = getCookie("token");
    // const isClient = JSON.parse(getCookie("isClient") || "null");

    // if (!token) {
    //   toast({
    //     title: "Unauthorized",
    //     description: "Please log in as a provider to continue.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   router.push(`${directoryUrl}/provider-sign-in`);
    //   return;
    // }
    // if (isClient === true) {
    //   toast({
    //     title: "Access Denied",
    //     description: "You must be logged in as a provider to access this page.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    router.push(`${directoryUrl}/provider-sign-up`);

    // const plan = planKey.includes("premium")
    //   ? "premium"
    //   : ("starter" as "starter" | "premium");
    // try {
    //   const checkoutUrl = await subscribePlan(plan, selectBilling);
    //   window.location.href = checkoutUrl;
    // } catch (err) {
    //   console.error("Subscription error:", err);
    //   toast({
    //     title: "Subscription failed",
    //     status: "error",
    //     description: "Something went wrong. Please try again later.",
    //   });
    // }
  };

  return (
    <HStack
      alignItems={"flex-start"}
      justifyContent={"center"}
      gap={"24px"}
      flexWrap={"wrap"}
      mt={"-190px"}
      maxW={"1440px"}
      marginX={"auto"}
      padding={{
        base: "0px 16px 32px 16px",
        sm: "0px 16px 32px 16px",
        md: "0px 16px 32px 16px",
        lg: "0px 16px 32px 16px",
        xl: "0px 16px 64px 16px",
        "2xl": "0px 16px 64px 16px",
      }}
    >
      {activePlans?.map(
        ({ key, icon: Icon, title, price, description, features }, index) => (
          <Box
            key={index}
            bg="base.white.light"
            borderRadius={{ base: "12px", lg: "24px" }}
            boxShadow="md"
            width={{ base: "280px", md: "300px", lg: "430px" }}
            textAlign="center"
            overflow="hidden"
          >
            <Box p={"32px 32px 40px 32px"} gap={"24px"} h={"238px"}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="10px"
                bg="base.white.light"
                width="48px"
                height="48px"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              >
                <Icon />
              </Box>
              <Text
                color="primary.700.light"
                fontWeight="600"
                fontSize={{ base: "18px", lg: "20px" }}
              >
                {title}
              </Text>
              <Text
                fontWeight="600"
                fontSize={{ base: "24px", lg: "36px" }}
                lineHeight="72px"
                color="secondary.950.light"
              >
                {price}
              </Text>
              <Text
                color="secondary.700.light"
                fontSize="16px"
                fontWeight="600"
              >
                {description}
              </Text>
            </Box>
            <Flex
              padding={{ base: "0px 12px", lg: "0px 32px" }}
              flexDirection="column"
              gap={"16px"}
              transitionDuration={"300ms"}
              maxHeight={
                isOpenAllFeatures?.isOpen && isOpenAllFeatures?.key === key
                  ? "720px"
                  : "206px"
              }
              ml={{ base: "0px", sm: "0px", md: "4px", lg: "16px" }}
              overflow={"hidden"}
            >
              {features.map(({ label, tooltip }, idx) => (
                <HStack key={idx} gap={"12px"} textAlign={"start"}>
                  <CheckIcon
                    svg={{
                      width: "12px",
                      height: "12px",
                      style: { minWidth: "12px", minHeight: "12px" },
                    }}
                  />
                  <Tooltip
                    label={tooltip}
                    fontSize="14px"
                    placement="bottom"
                    hasArrow
                  >
                    <Text
                      color="secondary.700.light"
                      fontWeight="400"
                      fontSize="16px"
                      cursor="pointer"
                    >
                      {label}
                    </Text>
                  </Tooltip>
                </HStack>
              ))}
            </Flex>
            <Flex
              display={"inline-flex"}
              cursor="pointer"
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              gap={"4px"}
              mt={
                isOpenAllFeatures?.isOpen && isOpenAllFeatures?.key === key
                  ? "12px"
                  : "0px"
              }
              mb={"12px"}
              opacity={1}
              transitionDuration={"300ms"}
              _hover={{ opacity: 0.6 }}
              onClick={() =>
                setIsOpenAllFeatures((prev) =>
                  prev?.key !== key
                    ? { isOpen: true, key }
                    : { isOpen: !prev.isOpen, key }
                )
              }
            >
              {isOpenAllFeatures?.isOpen && isOpenAllFeatures?.key === key ? (
                <>
                  <Text
                    color="primary.500.light"
                    fontSize="16px"
                    fontWeight="600"
                  >
                    See Less Features
                  </Text>
                  <AngleDownIcon
                    svg={{
                      width: "14px",
                      height: "14px",
                      style: { transform: "rotate(180deg)" },
                    }}
                  />
                </>
              ) : (
                <>
                  <Text
                    color="primary.500.light"
                    fontSize="16px"
                    fontWeight="600"
                  >
                    See All Features
                  </Text>
                  <AngleDownIcon svg={{ width: "14px", height: "14px" }} />
                </>
              )}
            </Flex>
            <Box
              borderTop={"1px solid"}
              borderColor={"secondary.100.light"}
              p={{ base: "12px", lg: "32px" }}
              gap="24px"
            >
              <Button
                type="button"
                bg="primary.500.light"
                border={"1px solid"}
                borderColor={"primary.500.light"}
                h="48px"
                width={"100%"}
                borderRadius="8px"
                color="base.white.light"
                _hover={{ bg: "base.white.light", color: "primary.500.light" }}
                _active={{ bg: "base.white.light", color: "primary.500.light" }}
                onClick={() => handleSubscribe(key)}
              >
                Get started
              </Button>
            </Box>
          </Box>
        )
      )}
    </HStack>
  );
};

export default PlanBox;
