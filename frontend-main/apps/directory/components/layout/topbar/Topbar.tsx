"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "@repo/ui/assets/logo.webp";
import AngleUpIcon from "@repo/ui/components/icons/AngleUpIcon";
import { useRouter } from "next/navigation";
import MobileTopbar from "./MobileTopbar";
import Profile from "@repo/ui/components/profile/Profile";
import { directoryTopbarLinks } from "../../../constants/constants";
import { getCookie } from "@repo/ui/utils/storage";
import { getUserRoleFromToken } from "@repo/ui/utils/auth";
import { colors } from "@repo/ui/theme";

const Topbar = () => {
  const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<{ key: string; value: boolean }>({
    key: "",
    value: false,
  });
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  useEffect(() => {
    setTokenLoading(true);
    const tokenFromCookie = getCookie("token");
    setToken(tokenFromCookie);
    setTokenLoading(false);
  }, []);

  const handleLinkClick = useCallback(
    (path: string) => router.push(path),
    [router]
  );

  const handleSubLinkClick = useCallback(
    (path: string) => router.push(path),
    [router]
  );

  const rightSideContent = useMemo(() => {
    if (tokenLoading) {
      return (
        <Flex
          width={"240px"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner color="secondary.500.light" />
        </Flex>
      );
    } else if (token) {
      const userRole = getUserRoleFromToken(token);
      return (
        <Profile
          activeProject="directory"
          role={userRole === "client" ? "client" : ""}
        />
      );
    } else {
      return (
        <Flex alignItems={"center"} gap={{ lg: "14px", xl: "16px" }}>
          <Menu isLazy>
            <MenuButton
              as={Button}
              width={{ lg: "60px", xl: "70px" }}
              height={"40px"}
              fontSize={{ lg: "12px", xl: "14px" }}
              border={"1px solid"}
              borderRadius={"8px"}
              borderColor={"primary.500.light"}
              backgroundColor={"base.white.light"}
              color={"primary.500.light"}
              _hover={{
                color: "base.white.light",
                backgroundColor: "primary.500.light",
              }}
              transitionDuration={"300ms"}
            >
              Login
            </MenuButton>
            <MenuList
              border={"1px solid"}
              borderColor={"secondary.100.light"}
              backgroundColor={"base.white.light"}
              paddingY={"4px"}
              zIndex={100}
            >
              <MenuItem
                fontSize={"14px"}
                paddingY={"8px"}
                _hover={{ bg: "secondary.100.light" }}
                onClick={() => router.push(`${directoryUrl}/client-sign-in`)}
              >
                Login as Client
              </MenuItem>
              <MenuItem
                fontSize={"14px"}
                paddingY={"8px"}
                _hover={{ bg: "secondary.100.light" }}
                onClick={() => router.push(`${directoryUrl}/provider-sign-in`)}
              >
                Login as Provider
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            width={{ lg: "130px", xl: "154px" }}
            height={"40px"}
            fontSize={{ lg: "12px", xl: "14px" }}
            border={"1px solid"}
            borderRadius={"8px"}
            borderColor={"primary.500.light"}
            backgroundColor={"primary.500.light"}
            color={"base.white.light"}
            _hover={{
              color: "primary.500.light",
              backgroundColor: "base.white.light",
            }}
            transitionDuration={"300ms"}
            onClick={() => {
              router.push(`${directoryUrl}/provider-sign-up`);
            }}
          >
            Join as a Provider
          </Button>
        </Flex>
      );
    }
  }, [tokenLoading, token]);

  return (
    <Flex
      as={"header"}
      padding={{ base: "8px 16px", lg: "8px 16px", xl: "32px 64px" }}
      height={"96px"}
      backgroundColor={"base.white.light"}
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          src={logo.src}
          alt="Logo"
          height={{ lg: "34px", xl: "40px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: 0.8 }}
          onClick={() => router.push("/")}
        />
        <Flex as={"nav"}>
          <Flex as={"ul"} alignItems={"center"} gap={{ lg: "8px", xl: "32px" }}>
            {directoryTopbarLinks.map((menu) => {
              if (menu.path) {
                return (
                  <Flex key={menu.key} as={"li"}>
                    <Button
                      type="button"
                      backgroundColor={"transparent"}
                      color={"grayScale.950.light"}
                      padding={0}
                      transitionDuration={"300ms"}
                      _hover={{ opacity: 0.7 }}
                      onClick={() => handleLinkClick(menu.path)}
                    >
                      {menu.label}
                    </Button>
                  </Flex>
                );
              } else {
                const isHoveredItem =
                  isHovered.key === menu.key && isHovered.value;
                return (
                  <Flex key={menu.key} as={"li"}>
                    <Button
                      position={"relative"}
                      display={"flex"}
                      gap={"4px"}
                      type="button"
                      backgroundColor={"transparent"}
                      color={"grayScale.950.light"}
                      padding={0}
                      transitionDuration={"300ms"}
                      cursor={"default"}
                      _hover={{ bg: "transparent" }}
                      onMouseOver={(e) => {
                        e.stopPropagation();
                        setIsHovered({ key: menu.key, value: true });
                      }}
                      onMouseOut={(e) => {
                        e.stopPropagation();
                        setIsHovered({ key: "", value: false });
                      }}
                    >
                      {menu.label}
                      <AngleUpIcon
                        svg={{
                          style: {
                            rotate: isHoveredItem ? "0deg" : "180deg",
                            pointerEvents: "none",
                            transitionDuration: "300ms",
                          },
                        }}
                      />
                      <Flex
                        as={"ul"}
                        flexDirection={"column"}
                        position={"absolute"}
                        top={"100%"}
                        left={0}
                        opacity={isHoveredItem ? 1 : 0}
                        bg={"base.white.light"}
                        padding={{ lg: "8px", xl: "12px" }}
                        borderRadius={"12px"}
                        border={"1px solid"}
                        borderColor={"secondary.100.light"}
                        transitionDuration={"300ms"}
                        zIndex={100}
                        pointerEvents={isHoveredItem ? "all" : "none"}
                      >
                        {menu?.subMenuLinks &&
                          menu.subMenuLinks.map(
                            ({ description, key, label, path, icon: Icon }) => {
                              return (
                                <Flex
                                  key={key}
                                  as={"li"}
                                  padding={{ lg: "8px", xl: "12px" }}
                                  gap={{ lg: "12px", xl: "16px" }}
                                  cursor={"pointer"}
                                  borderRadius={"8px"}
                                  transitionDuration={"300ms"}
                                  _hover={{ bg: "secondary.100.light" }}
                                  onClick={() => handleSubLinkClick(path)}
                                >
                                  <Icon
                                    path={{
                                      stroke:
                                        key === "ourBlogs" ||
                                        key === "ourBlogs" ||
                                        key === "findBySpeciality" ||
                                        key === "providerBenefits" ||
                                        key === "findByState" ||
                                        key === "podcasts" ||
                                        key === "payWhatYouCan"
                                          ? colors?.secondary?.["500"]?.light
                                          : undefined,
                                      fill:
                                        key === "findByTherapist" ||
                                        key === "marketHub"
                                          ? colors?.secondary?.["500"]?.light
                                          : undefined,
                                    }}
                                  />
                                  <Flex
                                    direction={"column"}
                                    gap={"4px"}
                                    alignItems={"flex-start"}
                                  >
                                    <Text
                                      fontWeight={600}
                                      fontSize={{ lg: "14px", xl: "16px" }}
                                      color={"secondary.950.light"}
                                    >
                                      {label}
                                    </Text>
                                    <Text
                                      fontWeight={400}
                                      fontSize={{ lg: "12px", xl: "14px" }}
                                      color={"secondary.600.light"}
                                    >
                                      {description}
                                    </Text>
                                  </Flex>
                                </Flex>
                              );
                            }
                          )}
                      </Flex>
                    </Button>
                  </Flex>
                );
              }
            })}
          </Flex>
        </Flex>
        {rightSideContent}
      </Flex>
      <MobileTopbar />
    </Flex>
  );
};

export default Topbar;
