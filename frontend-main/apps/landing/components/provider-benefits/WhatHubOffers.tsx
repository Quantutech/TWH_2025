"use client";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { offersHub } from "@repo/ui/constants/constant";
import { colors } from "@repo/ui/theme";
import { FaMinus, FaPlus } from "react-icons/fa";

const WhatHubOffers = () => {
  return (
    <Box bg="base.white.light" width={"100%"}>
      <Box
        maxW={"1440px"}
        margin={"auto"}
        justifyContent="center"
        alignItems="center"
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <Flex align="center" textAlign="center" justifyContent="center">
          <Text
            fontSize={{ base: "24px", lg: "30px" }}
            fontWeight="700"
            lineHeight={{ base: "36px", lg: "45px" }}
            color="secondary.950.light"
            mb={"32px"}
          >
            What TeleWellness Hub Offers You
          </Text>
        </Flex>
        <HStack
          alignItems="flex-start"
          justifyContent="center"
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <VStack align="center" gap={"16px"}>
            {offersHub.map(
              (
                { answer, icon: Icon, question, title, answer2, question2 },
                index
              ) => (
                <Accordion allowMultiple key={index}>
                  <AccordionItem key={index} border="none">
                    {({ isExpanded }) => (
                      <Box
                        w={{
                          base: "100%",
                          sm: "460px",
                          md: "700px",
                          lg: "866px",
                        }}
                        borderWidth="1px"
                        borderColor="secondary.100.light"
                        borderRadius="12px"
                        boxShadow="sm"
                        p={{ base: 4, lg: 6 }}
                        bg="base.white.light"
                      >
                        <AccordionButton
                          _hover={{ background: "none" }}
                          justifyContent="space-between"
                        >
                          <HStack spacing={4} flex="1" textAlign="left">
                            <Box
                              padding={{ base: "8px", md: "16px" }}
                              borderRadius="32px"
                              bg={"secondary.100.light"}
                            >
                              <Icon svg={{ width: "24px", height: "24px" }} />
                            </Box>

                            <Text
                              fontWeight="600"
                              fontSize={{ base: "16px", md: "18px" }}
                              color="#2D3748"
                            >
                              {title}
                            </Text>
                          </HStack>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="50%"
                            p={2}
                          >
                            {isExpanded ? (
                              <Box
                                padding={{ base: "6px", md: "6px" }}
                                borderRadius="24px"
                                border={"1px solid"}
                                borderColor={"secondary.500.light"}
                                bg={"base.white.light"}
                              >
                                <FaMinus
                                  color={colors?.secondary?.["800"]?.light}
                                  size={12}
                                />
                              </Box>
                            ) : (
                              <Box
                                padding={{ base: "6px", md: "6px" }}
                                borderRadius="24px"
                                border={"1px solid"}
                                borderColor={"secondary.500.light"}
                                bg={"base.white.light"}
                              >
                                <FaPlus
                                  color={colors?.secondary?.["500"]?.light}
                                  size={12}
                                />
                              </Box>
                            )}
                          </Box>
                        </AccordionButton>
                        <AccordionPanel
                          ml={12}
                          pb={4}
                          pt={2}
                          color="#2D3748"
                          fontSize={{ base: "14px", md: "16px" }}
                        >
                          <VStack align="start" spacing={4}>
                            <HStack spacing={4}>
                              <Box
                                width={{ base: "20px", md: "24px" }}
                                height={{ base: "20px", md: "24px" }}
                              >
                                <Icon svg={{ width: "100%", height: "100%" }} />
                              </Box>

                              <Text fontWeight="500">{question}</Text>
                            </HStack>
                            <Text>{answer}</Text>
                          </VStack>
                          {question2 && (
                            <VStack align="start" spacing={4} mt={4}>
                              <HStack spacing={4}>
                                <Box
                                  width={{ base: "20px", md: "24px" }}
                                  height={{ base: "20px", md: "24px" }}
                                >
                                  <Icon
                                    svg={{ width: "100%", height: "100%" }}
                                  />
                                </Box>
                                <Text fontWeight="500">{question2}</Text>
                              </HStack>
                              <Text>{answer2}</Text>
                            </VStack>
                          )}
                        </AccordionPanel>
                      </Box>
                    )}
                  </AccordionItem>
                </Accordion>
              )
            )}
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default WhatHubOffers;
