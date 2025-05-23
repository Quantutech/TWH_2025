"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import SearchInput from "@repo/ui/components/SearchInput";
import searchIcon from "@repo/ui/assets/telewellnesshub/search.webp";
import location from "@repo/ui/assets/telewellnesshub/location.webp";
import archive from "@repo/ui/assets/telewellnesshub/archive.webp";
import { informationBoxes } from "@repo/ui/constants/constant";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInsurances, getStates } from "@repo/ui/utils/api";
import { useRouter } from "next/navigation";
import { webUrls } from "@repo/ui/config/router-config";
import {
  GetInsurancesResponseData,
  GetStatesResponseData,
  ResponsePaginationData,
} from "@repo/ui/utils/type";

const TelewellnessHub = () => {
  const [locationInfo, setLocationInfo] = useState<GetStatesResponseData>();
  const [locationInputFocused, setLocationInputFocused] =
    useState<boolean>(false);
  const [insuranceInfo, setInsuranceInfo] =
    useState<GetInsurancesResponseData>();
  const [insuranceInputFocused, setInsuranceInputFocused] =
    useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const router = useRouter();
  const searchInputIconBreakpointValue = useBreakpointValue({
    base: "20px",
    md: "24px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["states", 20, locationInfo?.name, 233],
    queryFn: ({ pageParam, queryKey }) =>
      getStates(
        queryKey[2] as string,
        pageParam,
        queryKey[1] as number,
        queryKey[3] as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.meta?.page;
      const totalPages = lastPage?.data?.meta?.totalDocs;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: locationInputFocused,
    retry: false,
  });

  const locationSuggestionListData = useMemo(() => {
    if (!data?.pages?.length) return [];
    return data.pages.reduce(
      (
        acc: GetStatesResponseData[],
        page: ResponsePaginationData<GetStatesResponseData[]>
      ) => {
        return [...acc, ...page.data.data];
      },
      []
    );
  }, [data]);

  const {
    data: insuranceData,
    fetchNextPage: insuranceFetchNextPage,
    hasNextPage: insuranceHasNextPage,
    isFetchingNextPage: insuranceIsFetchingNextPage,
    isLoading: insuranceIsLoading,
    isError: insuranceIsError,
  } = useInfiniteQuery({
    queryKey: ["insurance", 20, insuranceInfo?.name],
    queryFn: ({ pageParam, queryKey }) =>
      getInsurances(queryKey[2] as string, pageParam, queryKey[1] as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.meta?.page;
      const totalPages = lastPage?.data?.meta?.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: insuranceInputFocused,
    retry: false,
  });

  const insuranceSuggestionListData = useMemo(() => {
    if (!insuranceData?.pages?.length) return [];
    return insuranceData.pages.reduce(
      (
        acc: GetInsurancesResponseData[],
        page: ResponsePaginationData<GetInsurancesResponseData[]>
      ) => {
        return [...acc, ...page.data.data];
      },
      []
    );
  }, [insuranceData]);

  const locationSuggestionList = useMemo(() => {
    if (isError) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
        >
          No data found
        </Flex>
      );
    } else if (isLoading) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
        >
          <Spinner color="secondary.500.light" />
        </Flex>
      );
    } else if (
      (locationInputFocused && locationSuggestionListData?.length > 0) ||
      isFetchingNextPage
    ) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          flexDirection={"column"}
          gap={"4px"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
          onScroll={(e) => {
            const target = e.currentTarget;
            if (
              target.scrollHeight - target.scrollTop ===
              target.clientHeight
            ) {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }
          }}
        >
          {locationSuggestionListData?.map((item) => {
            return (
              <Text
                userSelect={"none"}
                cursor={"pointer"}
                borderRadius={"4px"}
                padding={"4px"}
                _hover={{ bg: "secondary.200.light" }}
                onClick={() => {
                  setLocationInfo(item);
                }}
              >
                {item.name}
              </Text>
            );
          })}
          {isFetchingNextPage && (
            <Flex width={"100%"} justifyContent={"center"}>
              <Spinner
                color="secondary.500.light"
                width={"24px"}
                minWidth={"24px"}
                height={"24px"}
                minHeight={"24px"}
              />
            </Flex>
          )}
        </Flex>
      );
    }
  }, [
    isError,
    isLoading,
    locationInputFocused,
    locationSuggestionListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  const insuranceSuggestionList = useMemo(() => {
    if (insuranceIsError) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
        >
          No data found
        </Flex>
      );
    } else if (insuranceIsLoading) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
        >
          <Spinner color="secondary.500.light" />
        </Flex>
      );
    } else if (
      (insuranceInputFocused && insuranceSuggestionListData?.length > 0) ||
      insuranceIsFetchingNextPage
    ) {
      return (
        <Flex
          pos={"absolute"}
          left={0}
          right={0}
          top={"60px"}
          flexDirection={"column"}
          gap={"4px"}
          bg={"base.white.light"}
          zIndex={100}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"8px"}
          padding={"16px"}
          height={"200px"}
          maxH={"200px"}
          overflow={"auto"}
          onScroll={(e) => {
            const target = e.currentTarget;
            if (
              target.scrollHeight - target.scrollTop ===
              target.clientHeight
            ) {
              if (insuranceHasNextPage && !insuranceIsFetchingNextPage) {
                insuranceFetchNextPage();
              }
            }
          }}
        >
          {insuranceSuggestionListData?.map((item) => {
            return (
              <Text
                userSelect={"none"}
                cursor={"pointer"}
                borderRadius={"4px"}
                padding={"4px"}
                _hover={{ bg: "secondary.200.light" }}
                onClick={() => {
                  setInsuranceInfo(item);
                }}
              >
                {item.name}
              </Text>
            );
          })}
          {insuranceIsFetchingNextPage && (
            <Flex width={"100%"} justifyContent={"center"}>
              <Spinner
                color="secondary.500.light"
                width={"24px"}
                minWidth={"24px"}
                height={"24px"}
                minHeight={"24px"}
              />
            </Flex>
          )}
        </Flex>
      );
    }
  }, [
    insuranceIsError,
    insuranceIsLoading,
    insuranceInputFocused,
    insuranceSuggestionListData,
    insuranceFetchNextPage,
    insuranceHasNextPage,
    insuranceIsFetchingNextPage,
  ]);

  return (
    <Flex direction="column">
      <Flex
        h="560px"
        position={"absolute"}
        top={"96px"}
        left={0}
        right={0}
        direction="column"
        align="center"
        justify="center"
        bg="primary.500.light"
        transitionDuration={"300ms"}
      >
        <Text
          fontSize={{ base: "20px", md: "40px", lg: "48px" }}
          fontWeight="700"
          color="base.white.light"
          textAlign="center"
          mb="8px"
          userSelect={"none"}
          px={"16px"}
        >
          Your Go-To Hub for Wellness
        </Text>
        <Text
          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
          fontWeight="500"
          color="base.white.light"
          textAlign="center"
          mb={{ base: "20px", md: "80px" }}
          userSelect={"none"}
          px={"16px"}
        >
          Book appointments, explore expert content, and access mental health
          support. Free, no sign-up required.
        </Text>
        <HStack
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          w={{
            base: "288px",
            sm: "452px",
            md: "756px",
            lg: "872px",
            xl: "1272px",
            "2xl": "1312px",
          }}
          bg={"base.white.light"}
          padding={{ base: "6px 12px", md: "12px 24px" }}
          borderRadius="16px"
        >
          <SearchInput
            icon={searchIcon.src}
            placeholder="Specialty, Provider Name or Service..."
            width="100%"
            containerProps={{
              p: { base: "8px", md: "12px" },
              border: "none",
            }}
            imageProps={{
              width: searchInputIconBreakpointValue,
              height: searchInputIconBreakpointValue,
            }}
            inputProps={{
              _placeholder: { color: "secondary.500.light" },
            }}
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
            }}
          />
          <Box
            h={{ base: "1px", md: "50%" }}
            w={{ base: "100%", md: "1px" }}
            bg={"grayScale.200.light"}
          />
          <Box width={"100%"} pos={"relative"}>
            <SearchInput
              icon={location.src}
              placeholder="Location or Choose Online Sessions"
              width="100%"
              containerProps={{
                p: { base: "8px", md: "12px" },
                border: "none",
              }}
              imageProps={{
                width: searchInputIconBreakpointValue,
                height: searchInputIconBreakpointValue,
              }}
              inputProps={{
                _placeholder: { color: "secondary.500.light" },
              }}
              onfocus={() => {
                setLocationInputFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setLocationInputFocused(false);
                }, 200);
              }}
              onChange={(e) => {
                setLocationInfo((prev) => {
                  if (prev) {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  }
                  return prev;
                });
              }}
              value={locationInfo?.name}
            />
            {locationSuggestionList}
          </Box>
          <Box
            h={{ base: "1px", md: "50%" }}
            w={{ base: "100%", md: "1px" }}
            bg={"grayScale.200.light"}
          />
          <Box width={"100%"} pos={"relative"}>
            <SearchInput
              icon={archive.src}
              placeholder="Choose Insurance (optional)"
              width="100%"
              containerProps={{
                p: { base: "8px", md: "12px" },
                border: "none",
              }}
              imageProps={{
                width: searchInputIconBreakpointValue,
                height: searchInputIconBreakpointValue,
              }}
              inputProps={{
                _placeholder: { color: "secondary.500.light" },
              }}
              onfocus={() => {
                setInsuranceInputFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setInsuranceInputFocused(false);
                }, 200);
              }}
              onChange={(e) => {
                setInsuranceInfo((prev) => {
                  if (prev) {
                    return { ...prev, name: e.target.value };
                  }
                  return prev;
                });
              }}
              value={insuranceInfo?.name}
            />
            {insuranceSuggestionList}
          </Box>
          <Box
            display={{ base: "block", md: "none" }}
            h={{ base: "1px", md: "50%" }}
            w={{ base: "100%", md: "1px" }}
            bg={"grayScale.200.light"}
          />
          <Button
            height={{ base: "36px", md: "48px" }}
            width={{ base: "100%", md: "350px" }}
            minW={"220px"}
            borderRadius="8px"
            border="1px solid"
            borderColor={"secondary.500.light"}
            bg={"secondary.500.light"}
            color="base.white.light"
            _hover={{ bg: "base.white.light", color: "secondary.500.light" }}
            _active={{ bg: "base.white.light", color: "secondary.500.light" }}
            onClick={() => {
              const url = new URL(
                webUrls.directory as string,
                window.location.origin
              );
              url.searchParams.set("keyword", searchInputValue || "");
              url.searchParams.set(
                "stateValue",
                locationInfo?.id?.toString() || ""
              );
              url.searchParams.set(
                "stateLabel",
                locationInfo?.name?.toString() || ""
              );
              url.searchParams.set(
                "insuranceValue",
                insuranceInfo?.id?.toString() || ""
              );
              url.searchParams.set(
                "insuranceLabel",
                insuranceInfo?.name?.toString() || ""
              );

              router.push(url.href);
            }}
          >
            Find Your Provider
          </Button>
        </HStack>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          position={"absolute"}
          top={500}
          gap={{ base: "8px", sm: "12px", lg: "24px" }}
          w={{ xl: "auto", "2xl": "1312px" }}
          userSelect={"none"}
        >
          {informationBoxes.map((item, i) => (
            <HStack
              key={i}
              w={{
                base: "140px",
                sm: "220px",
                md: "180px",
                lg: "200px",
                xl: "300px",
                "2xl": "310px",
              }}
              padding={"24px 0px"}
              flexDirection={"column"}
              alignItems={"center"}
              borderRadius={"24px"}
              bg={"base.white.light"}
              border={"1px solid"}
              borderColor={"secondary.100.light"}
              textAlign="center"
            >
              <Text
                color={"primary.500.light"}
                fontSize={{ base: "24px", sm: "22px", lg: "30px" }}
                fontWeight={"700"}
              >
                {item?.header}
              </Text>
              <Text
                color={"secondary.800.light"}
                fontSize={{ base: "12px", sm: "14px", lg: "16px" }}
                fontWeight={"500"}
              >
                {item?.subHeader}
              </Text>
              <Text
                color={"secondary.800.light"}
                fontSize={{ base: "12px", sm: "14px", lg: "16px" }}
                fontWeight={"500"}
                p={{ base: "8px", sm: "12px", lg: "16px" }}
              >
                {item?.content}
              </Text>
            </HStack>
          ))}
        </Grid>
      </Flex>
      <Flex bg={"secondary.50.light"} h={"136px"} w={"100%"} />
    </Flex>
  );
};

export default TelewellnessHub;
