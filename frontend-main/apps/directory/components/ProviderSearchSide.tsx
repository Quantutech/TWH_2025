"use client";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import SearchInput from "@repo/ui/components/SearchInput";
import searchIcon from "@repo/ui/assets/telewellnesshub/search.webp";
import { useFilterAndSortContext } from "../contexts/FilterAndSortContexts";

const ProviderSearchSide = () => {
  const { search, setSearch } = useFilterAndSortContext();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const keyword = searchParams.get("keyword");
    if (keyword?.length) {
      setSearch(keyword);
    }
  }, []);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDir={{ base: "column", md: "row" }}
      mb={"16px"}
      gap={{ base: "12px", md: "0px" }}
    >
      <Text
        color={"base.black.light"}
        fontSize={{ base: "18px", lg: "24px" }}
        fontWeight={600}
      >
        Over 1,000 Providers to choose from
      </Text>

      <SearchInput
        icon={searchIcon.src}
        imageProps={{ width: "20px", height: "20px" }}
        inputProps={{ padding: "0px" }}
        placeholder={"Search for Providers..."}
        containerProps={{ maxW: { base: "100%", md: "310px" } }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Flex>
  );
};

export default ProviderSearchSide;
