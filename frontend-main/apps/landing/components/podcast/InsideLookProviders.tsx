"use client";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import podcastLeft from "@repo/ui/assets/podcast/podcast-left.webp";
import podcastRight from "@repo/ui/assets/podcast/podcast-right.webp";
import { clientFeatures, providersFeatures } from "@repo/ui/constants/constant";
const InsideLookProviders = () => {
  return (
    <Box w={"100%"} bg={"base.white.light"}>
      <VStack
        maxW={"1440px"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
        margin={"auto"}
        gap={"64px"}
        bg={"base.white.light"}
      >
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          flexDir={{ base: "column", md: "row" }}
          gap={"8px"}
        >
          <Text
            fontSize={{ base: "24px", lg: "30px" }}
            fontWeight={"600"}
            color={"secondary.950.light"}
            maxW={{ base: "100%", md: "210px" }}
            minW={{ base: "100%", md: "300px" }}
          >
            Inside Look at Providers
          </Text>
          <Text
            fontSize={{ base: "16px", lg: "20px" }}
            fontWeight={"400"}
            color={"secondary.600.light"}
            maxW={"868px"}
          >
            Get to know the real people behind the services. Each episode
            spotlights providers’ unique expertise, their approach to care, and
            the resources they offer, giving you a head start in finding the
            right fit for your wellness journey.
          </Text>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          w={"100%"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Image
            src={podcastLeft.src}
            alt="podcast"
            order={{ base: 2, md: 1 }}
            maxW={{ base: "100%", md: "450px", lg: "500px", xl: "644px" }}
          />
          <Box order={{ base: 1, md: 2 }}>
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "30px" }}
              mb="20px"
            >
              For Clients
            </Text>
            <VStack align="start" spacing="20px">
              {clientFeatures.map((item, index) => (
                <Box key={index}>
                  <Text
                    fontWeight="600"
                    fontSize={{ base: "18px", lg: "20px" }}
                  >
                    • {item.title}
                  </Text>
                  <Text
                    fontWeight="400"
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="secondary.600.light"
                  >
                    {item.description}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </HStack>
        <HStack flexDir={{ base: "column", md: "row" }}>
          <Box>
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "30px" }}
              mb="20px"
            >
              For Providers
            </Text>
            <VStack align="start" spacing="20px">
              {providersFeatures.map((item, index) => (
                <Box key={index}>
                  <Text
                    fontWeight="600"
                    fontSize={{ base: "18px", lg: "20px" }}
                  >
                    • {item.title}
                  </Text>
                  <Text
                    fontWeight="400"
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="secondary.600.light"
                  >
                    {item.description}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
          <Image
            src={podcastRight.src}
            alt="podcast"
            maxW={{ base: "100%", md: "450px", lg: "500px", xl: "644px" }}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default InsideLookProviders;
