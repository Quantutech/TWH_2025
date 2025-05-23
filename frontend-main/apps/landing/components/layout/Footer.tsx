"use client";
import {
  Box,
  Container,
  Flex,
  Link,
  Text,
  VStack,
  Image,
  Stack,
  SimpleGrid,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { socialLink, landingFooterLink } from "@repo/ui/constants/constant";
import logo from "@repo/ui/assets/logo.webp";
const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box bg="blue.50" color="gray.700" py={10}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={{ base: "16px", md: "32px" }}
          mb={"16px"}
        >
          <VStack
            align={{ base: "center", lg: "start" }}
            spacing={4}
            order={{ base: 2, md: 1 }}
            mb={{ base: "32px", md: "16px", lg: "8px" }}
          >
            <Image
              width={{ base: "240px", lg: "280px", xl: "316px" }}
              src={logo.src}
              alt="Logo"
              mx={"auto"}
              cursor={"pointer"}
              transitionDuration={"200ms"}
              _hover={{ opacity: 0.6 }}
              onClick={() => {
                router.push("/");
              }}
            />
            <Flex gap={4}>
              {socialLink.map((item, i) => (
                <Box
                  key={i}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={"10px"}
                  w="48px"
                  h="48px"
                  bg="base.white.light"
                  borderRadius="full"
                >
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      boxSize={6}
                      width={"24px"}
                      height={"24px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    />
                  </Link>
                </Box>
              ))}
            </Flex>
          </VStack>
          <Stack
            order={{ base: 1, md: 2 }}
            mb={{ base: "32px", md: "16px", lg: "8px" }}
            borderBottom={{ base: "1px solid #E5E5E5", md: "none" }}
            pb={{ base: "32px", md: "16px", lg: "8px" }}
          >
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              spacing={{ base: 8, md: 16, lg: 24 }}
              width="100%"
            >
              {landingFooterLink.map((section) => (
                <VStack alignItems="start" key={section.title}>
                  <Text fontSize={"18px"} fontWeight={"600"} mb={2}>
                    {section.title}
                  </Text>
                  {section.links.map((links) => (
                    <Link
                      key={links.path}
                      onClick={() => handleNavigation(links.path)}
                      fontSize={"16px"}
                      fontWeight={"400"}
                    >
                      {links.label}
                    </Link>
                  ))}
                </VStack>
              ))}
            </SimpleGrid>
          </Stack>
        </Flex>
        <Box
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="gray.300"
          pt={4}
          pb={4}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: "16px", md: "32px" }}
            justifyContent={"space-between"}
          >
            <VStack maxW={"628px"} alignItems={"start"}>
              <Text
                fontWeight={600}
                color={"secondary.950.light"}
                fontSize={"24px"}
              >
                About TeleWellness Hub
              </Text>

              <Text fontSize={"16px"} fontWeight={"400"} lineHeight={"normal"}>
                At TeleWellness Hub, we believe that mental and physical health
                are deeply connected. We provide easy access to high-quality
                mental health services, resources, and <br />
                providers—empowering individuals to take control of their
                well-being. Our mission is to bridge the gap between wellness
                and accessibility, creating a platform where care is inclusive,
                transparent, and empowering. We support both clients and
                providers, helping them grow and thrive in a supportive
                community.
              </Text>
            </VStack>
            <VStack alignItems={"start"}>
              <Text
                fontSize={"24px"}
                fontWeight={"600"}
                whiteSpace={"nowrap"}
                color={"secondary.950.light"}
              >
                Newsletter Signup
              </Text>
              <Text
                whiteSpace={"nowrap"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"secondary.800.light"}
              >
                Get the Latest in Mental Health Trends.
              </Text>
              <FormLabel
                fontSize={"14px"}
                fontWeight={500}
                color={"secondary.700.light"}
                mb={0}
              >
                Email
              </FormLabel>
              <Flex gap={"16px"}>
                <Input
                  type="email"
                  placeholder={"Enter your email"}
                  width={{ base: "100%", md: "280px", lg: "420px" }}
                  border={"1px solid"}
                  borderColor={"secondary.300.light"}
                  borderRadius={"8px"}
                  color={"secondary.400.light"}
                  _placeholder={{ color: "secondary.400.light" }}
                />
                <Button
                  type="button"
                  bg={"primary.500.light"}
                  color={"base.white.light"}
                  border={"1px solid"}
                  borderColor={"primary.500.light"}
                  fontWeight={600}
                  fontSize={"16px"}
                  _hover={{
                    bg: "base.white.light",
                    color: "primary.500.light",
                  }}
                  _active={{
                    bg: "base.white.light",
                    color: "primary.500.light",
                  }}
                >
                  Send
                </Button>
              </Flex>
            </VStack>
          </Stack>
        </Box>
        <Box textAlign="center" mt={4}>
          <Text fontSize="14px" fontWeight="400">
            If you are in a life threatening situation, do not use this site.
            Reach out to the Suicide and Crisis Lifeline by calling or texting
            988. It’s FREE, available 24/7, and offers care in both English and
            Spanish. You can learn more at{" "}
            <Link
              href="https://988lifeline.org/"
              isExternal
              color="blue.500"
              textDecoration="underline"
            >
              https://988lifeline.org/
            </Link>
            If your issue is an emergency, call 911 or go to your nearest
            emergency room.
          </Text>
        </Box>
        <Box
          mt={4}
          borderTop="1px solid"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text fontSize={"14px"} fontWeight={"400"}>
            © 2025 TeleWellness Hub | All Rights Reserved
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
