"use client";

import React, { useState, useMemo } from "react";
import { VStack, Text, Box, Flex, Link } from "@chakra-ui/react";
import SearchInput from "@repo/ui/components/SearchInput";
import searchIcon from "@repo/ui/assets/telewellnesshub/search.webp";
import { termsConditionsData } from "@repo/ui/constants/constant";

const TermsConditionContent = () => {
  const [currentTitle, setCurrentTitle] = useState("Directory Terms of Use");
  const [searchTerm, setSearchTerm] = useState("");
  const currentContent = useMemo(
    () => termsConditionsData.find((item) => item.title === currentTitle),
    [currentTitle]
  );

  const filteredContent = useMemo(() => {
    if (!currentContent || !searchTerm.trim())
      return currentContent?.content || [];

    const lowerTerm = searchTerm.toLowerCase();
    return currentContent.content.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerTerm) ||
        item.answer.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm, currentContent]);

  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        w={"100%"}
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
        gap={{ base: "16px", lg: "8px" }}
      >
        <Flex flexDirection={"column"} gap={"12px"}>
          <Text
            fontSize={{ base: "14px", sm: "16px" }}
            fontWeight={"600"}
            color={"primary.700.light"}
          >
            Current as of 20 Jan 2022
          </Text>
          <Text
            fontSize={{ base: "24px", md: "36px", xl: "48px" }}
            fontWeight={"600"}
          >
            {currentTitle}
          </Text>
          <SearchInput
            icon={searchIcon.src}
            placeholder={"Search your question"}
            width={"100%"}
            containerProps={{ maxW: "100%" }}
            inputProps={{
              _placeholder: { color: "secondary.400.light" },
              color: "secondary.400.light",
              padding: "0px",
              fontSize: "14px",
              onChange: (e) => setSearchTerm(e.target.value),
              value: searchTerm,
            }}
          />
        </Flex>
        <Text
          fontSize={{ base: "18px", md: "20px" }}
          fontWeight={"400"}
          color={"secondary.600.light"}
          maxW={{ base: "100%", lg: "480px" }}
        >
          By accessing our website, you are agreeing to be bound by these terms
          of service, and agree that you are responsible for compliance with any
          applicable local laws.
        </Text>
      </Flex>

      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        width={"100%"}
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
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        gap={{ base: "16px", lg: "8px" }}
      >
        <VStack
          gap={"12px"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          minW={"250px"}
        >
          <Text fontSize={"20px"} fontWeight={"600"}>
            Table of contents
          </Text>
          {termsConditionsData.map((item, index) => (
            <Link
              key={item.id}
              href={`#${item.href}`}
              onClick={() => {
                setCurrentTitle(item.title);
                setSearchTerm("");
              }}
            >
              <Text
                fontWeight={"500"}
                fontSize={"16px"}
                decoration={"underline"}
              >
                {index + 1}. {item.title}
              </Text>
            </Link>
          ))}
        </VStack>

        <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
          {filteredContent?.length > 0 ? (
            <Box>
              {filteredContent.map((item, index) => (
                <Box key={index} mb={"16px"}>
                  <Text
                    fontSize={{ base: "20px", md: "24px", lg: "30px" }}
                    color={"secondary.950.light"}
                    fontWeight={"600"}
                    mt={{ base: "24px", lg: "32px" }}
                    mb={{ base: "8px", lg: "16px" }}
                  >
                    {item.question}
                  </Text>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "16px", sm: "18px" }}
                    color={"secondary.600.light"}
                  >
                    {item.answer}
                  </Text>
                </Box>
              ))}
            </Box>
          ) : (
            <Text
              fontSize={{ base: "20px", md: "24px", lg: "30px" }}
              color={"secondary.950.light"}
              fontWeight={"600"}
              mt={{ base: "24px", lg: "32px" }}
              mb={{ base: "8px", lg: "16px" }}
            >
              No results found.
            </Text>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default TermsConditionContent;
