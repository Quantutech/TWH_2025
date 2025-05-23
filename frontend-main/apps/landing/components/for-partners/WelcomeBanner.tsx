"use client";
import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import banner from "@repo/ui/assets/for-partners/banner.webp";
const WelcomeBanner = () => {
  const handleScrollToForm = () => {
    const element = document.getElementById("partner-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="space-between"
      bg="secondary.50.light"
      margin="auto"
      maxW={"1440px"}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <VStack align={{ base: "flex-start", lg: "flex-start" }} spacing="12px">
        <Text
          fontSize={{ base: "18px", md: "26px", lg: "30px", xl: "36px" }}
          fontWeight="700"
          color={"secondary.950.light"}
        >
          Shape the Future of Wellness. Together.
        </Text>
        <Text
          fontSize={{ base: "16px", xl: "20px" }}
          fontWeight="400"
          color="secondary.600.light"
          lineHeight="30px"
          maxW={"650px"}
        >
          Partner with TeleWellness Hub to deliver innovative tools, services,
          and solutions directly to the mental health and wellness community.
          Together, we’re transforming provider success and client well-being.
        </Text>
        <Button
          h={{ base: "40px", md: "48px" }}
          justifyContent={"center"}
          padding={"12px"}
          alignItems={"center"}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          borderRadius={"8px"}
          fontWeight={"600"}
          fontSize={"16px"}
          color={"base.white.light"}
          bg={"primary.500.light"}
          _hover={{
            bg: "base.white.light",
            color: "primary.500.light",
          }}
          _active={{ bg: "transparent" }}
          onClick={handleScrollToForm}
        >
          Become a Partner
        </Button>
      </VStack>
      <Flex
        justifyContent={{ base: "center", lg: "flex-end" }}
        alignItems="center"
        w={{ base: "100%", lg: "50%" }}
      >
        <Image
          src={banner.src}
          width={{ base: "100%", lg: "500px", xl: "656px" }}
          height="auto"
          maxW="656px"
        />
      </Flex>
    </Flex>
  );
};

export default WelcomeBanner;
