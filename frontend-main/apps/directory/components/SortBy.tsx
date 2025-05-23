"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useBreakpoint,
} from "@chakra-ui/react";
import { Breakpoints } from "@repo/ui/utils/enums";
import HorizontalLineFilterIcon from "@repo/ui/components/icons/HorizontalLineFilterIcon";
import FilterIcon from "@repo/ui/components/icons/FilterIcon";
import { useFilterAndSortContext } from "../contexts/FilterAndSortContexts";
import { useToastNotification } from "@repo/ui/components/useToastNotification";

const SortBy = () => {
  const { setIsFiltersClicked, activeSortBy, setActiveSortBy, setLatLong } =
    useFilterAndSortContext();
  const showToast = useToastNotification();
  const breakpointValue = useBreakpoint();
  const [isSortByClicked, setIsSortByClicked] = useState(false);

  const sortByItems = [
    {
      key: "default",
      label: "Default",
      sort: { asc: 0, desc: 1 },
      onClick: () => setActiveSortBy(0),
    },
    {
      key: "most_popular",
      label: "Most popular",
      sort: { asc: 2, desc: 3 },
      onClick: () => setActiveSortBy(2),
    },
    // TODO: Add the nearest free & Most successful turn later
    // {
    //   key: "the_nearest_free_turn",
    //   label: "The nearest free turn",
    //   sort: { asc: 4, desc: 5 },
    //   onClick: () => {
    //     if (!navigator.geolocation) {
    //       setLatLong({
    //         lat: null,
    //         long: null,
    //       });
    //       showToast(
    //         "Error",
    //         "Your browser does not support geolocation.",
    //         "error"
    //       );
    //       return;
    //     }
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         setLatLong({
    //           lat: position.coords.latitude,
    //           long: position.coords.longitude,
    //         });
    //         setActiveSortBy(4);
    //       },
    //       (err) => {
    //         switch (err.code) {
    //           case err.PERMISSION_DENIED:
    //             setLatLong({
    //               lat: null,
    //               long: null,
    //             });
    //             setActiveSortBy(0);
    //             showToast(
    //               "Error",
    //               "Location permission denied. Please allow access to location in your browser settings.",
    //               "error"
    //             );
    //             break;
    //           case err.POSITION_UNAVAILABLE:
    //             setLatLong({
    //               lat: null,
    //               long: null,
    //             });
    //             setActiveSortBy(0);
    //             showToast(
    //               "Error",
    //               "Location information is currently unavailable. Please check your internet connection.",
    //               "error"
    //             );
    //             break;
    //           case err.TIMEOUT:
    //             setLatLong({
    //               lat: null,
    //               long: null,
    //             });
    //             setActiveSortBy(0);
    //             showToast(
    //               "Error",
    //               "Request to get location timed out. Please try again.",
    //               "error"
    //             );
    //             break;
    //           default:
    //             setLatLong({
    //               lat: null,
    //               long: null,
    //             });
    //             setActiveSortBy(0);
    //             showToast(
    //               "Error",
    //               "An unknown error occurred while retrieving location.",
    //               "error"
    //             );
    //         }
    //       }
    //     );
    //   },
    // },
    // {
    //   key: "most_successful_turns",
    //   label: "Most successful turns",
    //   sort: { asc: 6, desc: 7 },
    //   onClick: () => setActiveSortBy(6),
    // },
  ];

  return (
    <>
      <Flex
        bg={"base.white.light"}
        padding={"16px 24px"}
        gap={{ base: "16px", xl: "32px" }}
        alignItems={"center"}
        justifyContent={{ base: "space-around", lg: "flex-start" }}
        maxHeight={"56px"}
        borderRadius={"12px"}
        width={"100%"}
      >
        <Button
          order={{ base: 3, lg: 1 }}
          bg={"transparent"}
          fontSize={{ base: "16px", lg: "14px" }}
          fontWeight={500}
          padding={0}
          cursor={{ base: "pointer", lg: "default" }}
          color={"secondary.950.light"}
          _focus={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          onClick={() => {
            if (
              breakpointValue === Breakpoints.LG ||
              breakpointValue === Breakpoints.XL ||
              breakpointValue === Breakpoints["2XL"]
            ) {
              return;
            }
            setIsSortByClicked((prev) => !prev);
          }}
        >
          <HorizontalLineFilterIcon svg={{ style: { marginRight: "8px" } }} />
          Sort By
        </Button>
        <Box
          width={"1px"}
          height={"20px"}
          bg={"secondary.300.light"}
          order={2}
        />
        <Flex order={3} maxW={"580px"} display={{ base: "none", lg: "flex" }}>
          {sortByItems.map((item) => {
            return (
              <Button
                key={item.key}
                bg={"transparent"}
                color={
                  activeSortBy === item.sort.asc
                    ? "primary.500.light"
                    : "secondary.500.light"
                }
                p={{ base: "0px 6px", lg: "0px 6px", xl: "0px 16px" }}
                fontSize={"14px"}
                fontWeight={500}
                _hover={{ bg: "transparent", color: "primary.500.light" }}
                _active={{ bg: "transparent", color: "primary.500.light" }}
                onClick={item.onClick}
                transition={"300ms"}
              >
                {item.label}
              </Button>
            );
          })}
        </Flex>
        <Button
          display={{ base: "flex", lg: "none" }}
          bg={"transparent"}
          alignItems={"center"}
          fontSize={{ base: "16px", lg: "14px" }}
          color={"secondary.950.light"}
          fontWeight={600}
          padding={0}
          order={{ base: 1, lg: undefined }}
          _focus={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
          onClick={() => {
            setIsFiltersClicked((prev) => !prev);
          }}
        >
          <FilterIcon svg={{ style: { marginRight: "8px" } }} />
          Filters
        </Button>
      </Flex>
      <Flex
        position={"fixed"}
        flexDirection={"column"}
        opacity={isSortByClicked ? 1 : 0}
        pointerEvents={isSortByClicked ? "all" : "none"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        width={"100dvw"}
        height={"100dvh"}
        zIndex={100}
        bg={"rgba(0, 0, 0, 0.4)"}
        transitionDuration={"300ms"}
        onClick={(e) => {
          setIsSortByClicked(false);
          e.stopPropagation();
        }}
      >
        <Flex
          minWidth={"100dvw"}
          maxWidth={"100dvw"}
          position={"absolute"}
          bottom={0}
          left={0}
          right={0}
          flexDirection={"column"}
          height={isSortByClicked ? "250px" : "0px"}
          transitionDuration={"300ms"}
          bg={"base.white.light"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            py={"12px"}
          >
            <Box
              backgroundColor={"secondary.200.light"}
              w={"50px"}
              h={"6px"}
              borderRadius={"10px"}
            />
          </Flex>
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={"20px"}
            fontWeight={500}
            color={"secondary.950.light"}
            borderBottom={"1px solid"}
            borderColor={"secondary.100.light"}
            pb={"6px"}
            px={"16px"}
          >
            <HorizontalLineFilterIcon
              svg={{
                style: { marginRight: "8px", width: "24px", height: "24px" },
              }}
            />
            Sort By
          </Text>
          <RadioGroup
            display={"flex"}
            flexDirection={"column"}
            gap={"12px"}
            pt={"20px"}
            px={"16px"}
            color={"secondary.900.light"}
            fontSize={"16px"}
            fontWeight={500}
          >
            {sortByItems.map((item) => {
              return (
                <HStack key={item.key}>
                  <Radio
                    value={item.key}
                    checked={activeSortBy === item.sort.asc}
                    defaultChecked={activeSortBy === item.sort.asc}
                    onChange={item.onClick}
                  >
                    {item.label}
                  </Radio>
                </HStack>
              );
            })}
          </RadioGroup>
        </Flex>
      </Flex>
    </>
  );
};

export default SortBy;
