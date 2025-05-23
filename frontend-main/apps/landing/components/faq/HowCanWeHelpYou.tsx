"use client";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import searchIcon from "@repo/ui/assets/telewellnesshub/search.webp";
import SearchInput from "@repo/ui/components/SearchInput";
import { platformGuideData } from "@repo/ui/constants/constant";
import { useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const HowCanWeHelpYou = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return platformGuideData;

    return platformGuideData
      .map((section) => {
        const filteredItems = section.accordionItems.filter((item) => {
          const content = `${item.question} ${item.answer}`.toLowerCase();
          return content.includes(searchTerm.toLowerCase());
        });

        if (filteredItems.length > 0) {
          return { ...section, accordionItems: filteredItems };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchTerm]);
  return (
    <>
      <Box
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
      >
        <HStack
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap={{ base: "wrap", md: "nowrap" }}
          spacing={{ base: 4, md: 8 }}
        >
          <VStack
            w={{ base: "100%", md: "45%", lg: "50%" }}
            gap={"8px"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            spacing={4}
          >
            <Text
              fontWeight={"600"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"primary.600.light"}
            >
              Frequently Asked Questions
            </Text>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "24px", md: "25px", lg: "36px" }}
              lineHeight={"54px"}
              color={"secondary.950.light"}
            >
              How Can We Help You?
            </Text>
            <Text
              fontWeight={"400"}
              fontSize={{ base: "16px", lg: "20px" }}
              lineHeight={"30px"}
              color={"secondary.600.light"}
            >
              Have questions? We’re here to help.
            </Text>
            <SearchInput
              icon={searchIcon.src}
              placeholder={"Search your question"}
              width={"100%"}
              containerProps={{ maxW: { base: "270px", md: "310px" } }}
              inputProps={{
                _placeholder: { color: "secondary.400.light" },
                color: "secondary.400.light",
                padding: "0px",
                fontSize: "14px",
                value: searchTerm,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value),
              }}
            />
          </VStack>
          <VStack
            w={{ base: "100%", md: "55%", lg: "50%" }}
            spacing={4}
            align="stretch"
          >
            {filteredData.length > 0 ? (
              filteredData.map((section, index) => (
                <div key={index}>
                  <Text
                    fontSize={{ base: "20px", md: "22px", lg: "24px" }}
                    fontWeight={"600"}
                    lineHeight={"36px"}
                    textAlign={"left"}
                    mb={{ base: "12px", md: "12px", lg: "16px" }}
                  >
                    {section?.title}
                  </Text>
                  <Accordion allowMultiple>
                    {section?.accordionItems.map((item, index) => (
                      <AccordionItem key={index} border={"none"}>
                        {({ isExpanded }) => (
                          <Box
                            borderWidth="1px"
                            borderColor={"#E2E8F0"}
                            borderRadius={"12px"}
                            boxShadow="sm"
                            p={{ base: 1, md: 2, lg: 4 }}
                            w={"100%"}
                            bg={"base.white.light"}
                            mb={3}
                          >
                            <AccordionButton _hover={"none"}>
                              <Box
                                flex="1"
                                textAlign="left"
                                fontWeight="600"
                                fontSize={"16px"}
                                color={"#2D3748"}
                              >
                                {item.question}
                              </Box>
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                borderRadius="50%"
                                p={2}
                              >
                                {isExpanded ? (
                                  <FaMinus color="#60A5FA" />
                                ) : (
                                  <FaPlus color="#60A5FA" />
                                )}
                              </Box>
                            </AccordionButton>
                            <AccordionPanel
                              pb={4}
                              color={"#2D3748"}
                              fontSize={"14px"}
                            >
                              {item.answer}
                            </AccordionPanel>
                          </Box>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <Text color="gray.500" fontSize="16px">
                No results found.
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
      <Box
        width={"100%"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <Box
          width={"100%"}
          maxW={"1440px"}
          margin={"auto"}
          bg={"primary.500.light"}
          borderRadius="24px"
          padding={{ base: "32px", md: "64px" }}
        >
          <HStack
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "column", lg: "row" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex flexDirection={"column"}>
              <Text
                fontSize={{ base: "22px", sm: "24px", md: "30px" }}
                fontWeight="700"
                color="base.white.light"
                mb={{ base: "8px", md: "16px" }}
                whiteSpace={"nowrap"}
              >
                Join 2,000+ subscribers
              </Text>
              <Text
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                fontWeight="400"
                color="base.white.light"
                maxW={{ base: "100%", md: "700px" }}
              >
                Stay in the loop with everything you need to know.
              </Text>
            </Flex>
            <HStack>
              <Input
                type="email"
                placeholder="Enter your email"
                bg={"base.white.light"}
                padding={{ base: "0px 12px", md: "0px 16px" }}
                h={{ base: "40px", md: "48px" }}
                w={{ base: "100%", md: "324px", lg: "300px", xl: "342px" }}
                color={"secondary.400.light"}
                fontSize={{ base: "14px", md: "16px" }}
                _placeholder={{
                  color: "secondary.400.light",
                  fontsize: { base: "14px", md: "16px" },
                }}
              />
              <Button
                h={{ base: "40px", md: "48px" }}
                borderRadius="8px"
                fontWeight="600"
                fontSize={{ base: "14px", md: "16px" }}
                color="base.white.light"
                bg="primary.700.light"
                _hover="none"
              >
                Subscribe
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default HowCanWeHelpYou;
