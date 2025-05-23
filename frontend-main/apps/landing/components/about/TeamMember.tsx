"use client";
import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { aboutMeetOurTeam } from "@repo/ui/constants/constant";
import InstagramIcon from "@repo/ui/components/icons/InstagramIcon";
import YoutubeIcon from "@repo/ui/components/icons/YoutubeIcon";
import LinkedinIcon from "@repo/ui/components/icons/LinkedinIcon";
import BuzzsproutIcon from "@repo/ui/components/icons/BuzzsproutIcon";
import DribbbleIcon from "@repo/ui/components/icons/DribbbleIcon";
import Modal from "./team-member/Modal";
import { useState } from "react";
import { colors } from "@repo/ui/theme";

const TeamMember = () => {
  const [modalOption, setModalOption] = useState<{
    isOpen: boolean;
    data:
      | {
          name: string;
          professionalTitle: string;
          shortBio: string;
          description: string;
          imageUrl: string;
          instagramUrl: string;
          linkedinUrl: string;
          websiteUrl?: string;
        }
      | undefined;
  }>({ isOpen: false, data: undefined });
  return (
    <Flex w="100%">
      <HStack
        w="1440px"
        margin={"auto"}
        justifyContent={{ base: undefined, lg: "space-between" }}
        alignItems={{ base: "", lg: "flex-start" }}
        gap={{ base: "16px", lg: "0px" }}
        flexDirection={{ base: "column", lg: "row" }}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <VStack
          justifyContent="flex-start"
          alignItems="flex-start"
          maxW={{ base: "100%", lg: "300px" }}
          minW={{ base: "100%", lg: "300px" }}
          gap="8px"
        >
          <Text fontWeight="600" fontSize="16px" color="primary.700.light">
            Our Team
          </Text>
          <Text
            fontWeight="600"
            fontSize={{ base: "24px", md: "36px" }}
            color="secondary.950.light"
          >
            Meet Our Team
          </Text>
          <Text
            fontWeight="400"
            fontSize={{ base: "16px", md: "20px" }}
            color="secondary.600.light"
          >
            Dedicated Experts Committed to Your Well-Being.
          </Text>
        </VStack>
        <HStack
          gap={{ base: "16px", xl: "32px" }}
          overflow={"auto"}
          width={{ base: "calc(100dvw - 32px)", lg: "100%" }}
          flexWrap={{ base: "nowrap", lg: "wrap" }}
          maxW={{ base: undefined, lg: "760px" }}
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
        >
          {aboutMeetOurTeam.map((item) => {
            return (
              <Flex
                flexDirection={"column"}
                gap={"12px"}
                minW={"240px"}
                maxW={"240px"}
                p={"8px"}
                cursor={"default"}
                borderRadius={{ base: "8px", md: "16px" }}
                transitionDuration={"300ms"}
              >
                <Box maxW={"96px"} minW={"96px"} maxH={"96px"} minH={"96px"}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    maxW={"96px"}
                    minW={"96px"}
                    maxH={"96px"}
                    minH={"96px"}
                    borderRadius={"50%"}
                  />
                </Box>
                <Flex flexDirection={"column"}>
                  <Text
                    fontWeight={"600"}
                    fontSize={"18px"}
                    color={"secondary.950.light"}
                  >
                    {item.name}
                  </Text>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "14px", md: "16px" }}
                    color={"secondary.600.light"}
                    height={"48px"}
                  >
                    {item.professionalTitle}
                  </Text>
                </Flex>
                <Text
                  fontWeight={"400"}
                  fontSize={{ base: "14px", md: "16px" }}
                  color={"secondary.600.light"}
                  height={"120px"}
                >
                  {item.shortBio}
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={"14px"}
                  color={"primary.500.light"}
                  cursor={"pointer"}
                  transitionDuration={"300ms"}
                  _hover={{ opacity: "0.7" }}
                  onClick={() => {
                    setModalOption({ isOpen: true, data: item });
                  }}
                >
                  Read Bio
                </Text>
                <Flex gap={"16px"}>
                  {item.linkedinUrl && (
                    <Box
                      width={"20px"}
                      maxW={"20px"}
                      minW={"20px"}
                      height={"20px"}
                      minH={"20px"}
                      maxH={"20px"}
                      cursor={"pointer"}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: "0.7" }}
                      onClick={() => {
                        window.open(item.linkedinUrl, "_blank");
                      }}
                    >
                      <LinkedinIcon svg={{ width: "100%", height: "100%" }} />
                    </Box>
                  )}
                  {item.instagramUrl && (
                    <Box
                      width={"20px"}
                      maxW={"20px"}
                      minW={"20px"}
                      height={"20px"}
                      minH={"20px"}
                      maxH={"20px"}
                      cursor={"pointer"}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: "0.7" }}
                      onClick={() => {
                        window.open(item.instagramUrl, "_blank");
                      }}
                    >
                      <InstagramIcon
                        svg={{ width: "100%", height: "100%" }}
                        path={{ fill: colors?.secondary?.["500"]?.light }}
                      />
                    </Box>
                  )}
                  {item.websiteUrl && (
                    <Box
                      width={"20px"}
                      maxW={"20px"}
                      minW={"20px"}
                      height={"20px"}
                      minH={"20px"}
                      maxH={"20px"}
                      cursor={"pointer"}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: "0.7" }}
                      onClick={() => {
                        window.open(item.websiteUrl, "_blank");
                      }}
                    >
                      <DribbbleIcon svg={{ width: "100%", height: "100%" }} />
                    </Box>
                  )}

                  {item.youtubeUrl && (
                    <Box
                      width={"20px"}
                      maxW={"20px"}
                      minW={"20px"}
                      height={"20px"}
                      minH={"20px"}
                      maxH={"20px"}
                      cursor={"pointer"}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: "0.7" }}
                      onClick={() => {
                        window.open(item.youtubeUrl, "_blank");
                      }}
                    >
                      <YoutubeIcon
                        svg={{ width: "100%", height: "100%" }}
                        path={{ fill: colors?.secondary?.["500"]?.light }}
                      />
                    </Box>
                  )}
                  {item.buzzsproutUrl && (
                    <Box
                      width={"20px"}
                      maxW={"20px"}
                      minW={"20px"}
                      height={"20px"}
                      minH={"20px"}
                      maxH={"20px"}
                      cursor={"pointer"}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: "0.7" }}
                      onClick={() => {
                        window.open(item.buzzsproutUrl, "_blank");
                      }}
                    >
                      <BuzzsproutIcon svg={{ width: "100%", height: "100%" }} />
                    </Box>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </HStack>
      </HStack>
      <Modal modalOption={modalOption} setModalOption={setModalOption} />
    </Flex>
  );
};

export default TeamMember;
