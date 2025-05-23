"use client";
import {
  Box,
  Flex,
  Image,
  useBreakpointValue,
  Text,
  List,
  ListItem,
  Button,
  Link,
  Center,
  Spinner,
} from "@chakra-ui/react";
import CloseIcon from "@repo/ui/components/icons/CloseIcon";
import HamburgerIcon from "@repo/ui/components/icons/HamburgerIcon";
import React, { useEffect, useMemo, useState } from "react";
import logo from "@repo/ui/assets/logo.webp";
import UserIcon from "@repo/ui/assets/header/user-icon.webp";
import {
  adminTopbarMobileLinks,
  socialLink,
} from "@repo/ui/constants/constant";
import AngleUpIcon from "@repo/ui/components/icons/AngleUpIcon";
import { useRouter } from "next/navigation";
import { getCookie } from "@repo/ui/utils/storage";
import Profile from "@repo/ui/components/profile/Profile";

const MobileTopbar = () => {
  const router = useRouter();
  const mobileIconBreakpointValue = useBreakpointValue({
    base: "20px",
    sm: "26px",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSubMenuOpen, setActiveSubMenuOpen] = useState<string>();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  useEffect(() => {
    setTokenLoading(true);
    const tokenFromCookie = getCookie("token");
    setToken(tokenFromCookie);
    setTokenLoading(false);
  }, []);

  const handleSubMenuClick = (key: string) => {
    setActiveSubMenuOpen((prev) => {
      if (prev === key) {
        return undefined;
      }
      return key;
    });
  };

  const handleLinkClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setActiveSubMenuOpen(undefined);
  };

  const handleSubLinkClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setActiveSubMenuOpen(undefined);
  };

  const profileSide = useMemo(() => {
    if (tokenLoading) {
      return (
        <Center width={"240px"} height={"100%"} p={"16px 32px"}>
          <Spinner color="secondary.500.light" />
        </Center>
      );
    } else if (token) {
      return (
        <Profile
          activeProject="directory"
          mainContainerProps={{ p: "16px 32px" }}
          menuButtonProps={{ p: "0px" }}
          emailTextProps={{ maxW: "100%" }}
          firstAndLastNameContainerProps={{ maxW: "100%" }}
          rightArrowIconProps={{ marginLeft: "auto" }}
        />
      );
    } else {
      return (
        <Flex
          p={"16px 32px"}
          gap={"16px"}
          bg={"base.white.light !important"}
          box-shadow="0px 6px 24px 0px #18273414"
        >
          <Image
            src={UserIcon.src}
            alt="User icon"
            width={"56px"}
            height={"56px"}
          />
          <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"8px"}>
            <Text fontSize={"16px"} fontWeight={400} whiteSpace={"nowrap"}>
              Welcome to <b>TeleWellness Hub</b>
            </Text>
            <Flex
              alignItems={"center"}
              gap={"4px"}
              borderBottom={"1px"}
              borderColor={"primary.600.light"}
              height={"14px"}
            >
              <Text
                backgroundColor={"transparent"}
                padding={0}
                color={"primary.600.light"}
                onClick={() => {
                  router.push("/client-sign-in");
                }}
              >
                Sign in
              </Text>
              <Text color={"primary.600.light"}>or</Text>
              <Text
                backgroundColor={"transparent"}
                padding={0}
                color={"primary.600.light"}
                onClick={() => {
                  router.push("/client-sign-up");
                }}
              >
                Sign up
              </Text>
            </Flex>
          </Flex>
        </Flex>
      );
    }
  }, [tokenLoading, token]);

  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      w={"100%"}
      h={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Image
        src={logo.src}
        alt="Logo"
        height={{ base: "28px", sm: "32px" }}
        transitionDuration={"300ms"}
      />
      <Box position={"relative"} height={"100%"} width={"50px"}>
        <HamburgerIcon
          svg={{
            width: mobileIconBreakpointValue,
            height: mobileIconBreakpointValue,
            style: {
              minWidth: mobileIconBreakpointValue,
              maxWidth: mobileIconBreakpointValue,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: isMobileMenuOpen ? 0 : 1,
              pointerEvents: isMobileMenuOpen ? "none" : "auto",
              transition: "opacity 0.3s",
            },
            onClick: () => {
              setIsMobileMenuOpen((prev) => !prev);
            },
          }}
        />
        <CloseIcon
          svg={{
            width: mobileIconBreakpointValue,
            height: mobileIconBreakpointValue,
            style: {
              minWidth: mobileIconBreakpointValue,
              maxWidth: mobileIconBreakpointValue,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: isMobileMenuOpen ? 1 : 0,
              pointerEvents: isMobileMenuOpen ? "auto" : "none",
              transition: "opacity 0.3s",
            },
            onClick: () => {
              setIsMobileMenuOpen((prev) => !prev);
            },
          }}
        />
      </Box>
      <Flex
        opacity={isMobileMenuOpen ? 1 : 0}
        pointerEvents={isMobileMenuOpen ? "auto" : "none"}
        zIndex={isMobileMenuOpen ? 100 : -10}
        flexDirection={"column"}
        position={"absolute"}
        top={"96px"}
        left={0}
        right={0}
        w={"100%"}
        h={"100%"}
        bg={"secondary.50.light"}
        transition={"all 0.3s"}
      >
        {profileSide}

        <List listStyleType={"unset"} padding={"16px 32px"}>
          {adminTopbarMobileLinks.map((item, index) => {
            if (item.subMenuLinks) {
              return (
                <ListItem
                  key={item.key}
                  mb={index === adminTopbarMobileLinks.length - 1 ? 0 : "32px"}
                >
                  <Button
                    type="button"
                    bg={"transparent"}
                    width={"100%"}
                    height={"100%"}
                    fontWeight={500}
                    fontSize={"16px"}
                    padding={0}
                    color={"secondary.950.light"}
                    justifyContent={"space-between"}
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _focus={{ bg: "transparent" }}
                    onClick={() => handleSubMenuClick(item.key)}
                  >
                    {item.label}
                    <AngleUpIcon
                      svg={{
                        style: {
                          transform:
                            activeSubMenuOpen === item.key
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                          transition: "transform 0.3s",
                        },
                      }}
                    />
                  </Button>
                  <List
                    maxHeight={activeSubMenuOpen === item.key ? "120px" : "0px"}
                    overflow={"hidden"}
                    transition={"max-height 0.3s"}
                  >
                    {item.subMenuLinks.map((subItem, subIndex) => {
                      return (
                        <ListItem key={subItem.key} marginLeft={"16px"}>
                          <Button
                            type="button"
                            bg={"transparent"}
                            width={"100%"}
                            height={"100%"}
                            fontWeight={400}
                            padding={0}
                            color={"secondary.700.light"}
                            justifyContent={"space-between"}
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            _focus={{ bg: "transparent" }}
                            mt={subIndex === 0 ? "16px" : "0px"}
                            mb={
                              subIndex === item.subMenuLinks.length - 1
                                ? 0
                                : "16px"
                            }
                            onClick={() => handleSubLinkClick(subItem.path)}
                          >
                            {subItem.label}
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
                </ListItem>
              );
            } else {
              return (
                <ListItem
                  mb={index === adminTopbarMobileLinks.length - 1 ? 0 : "32px"}
                  key={item.key}
                >
                  <Button
                    type="button"
                    bg={"transparent"}
                    width={"100%"}
                    height={"100%"}
                    color={"secondary.950.light"}
                    fontWeight={500}
                    padding={0}
                    fontSize={"16px"}
                    justifyContent={"flex-start"}
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _focus={{ bg: "transparent" }}
                    onClick={() => handleLinkClick(item.path)}
                  >
                    {item.label}
                  </Button>
                </ListItem>
              );
            }
          })}
        </List>
        <Box
          h={"2px"}
          w={"90%"}
          marginX={"auto"}
          mt={"32px"}
          mb={"8px"}
          bg={"secondary.200.light"}
        />
        <Text
          color={"text.grayScale.950"}
          fontSize={"18px"}
          fontWeight={500}
          padding={"16px"}
        >
          Follow US
        </Text>
        <Flex gap={4} padding={"0px 16px"}>
          {socialLink.map((item, i) => (
            <Box
              key={i}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={"10px"}
              w="48px"
              h="48px"
              bg="secondary.100.light"
              borderRadius="full"
            >
              <Link key={item.label} href={item.href} aria-label={item.label}>
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
      </Flex>
    </Flex>
  );
};

export default MobileTopbar;
