"use client";
import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import logo from "@repo/ui/assets/white-logo.webp";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../theme";
import { providerGetMe, providerSubscriptonCancel } from "../utils/api";
import { useAuth } from "./context/AuthProvider";
import AngleUpIcon from "./icons/AngleUpIcon";
import { capitalizeFirstLetter, getDayFromISOString } from "../utils/helpers";
import SubscriptionModal from "./SubscriptionModal";
interface SubMenuItem {
  key: string;
  path: string;
  label: string;
  icon: undefined | string;
}

interface MenuItem {
  key: string;
  path: string;
  label: string;
  icon: undefined | string;
  subMenu?: SubMenuItem[];
  isLogout?: boolean;
}

interface SidebarProps {
  menu: MenuItem[];
  role?: string;
}

const Sidebar = ({ menu, role }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subMenuOpenKey, setSubMenuOpenKey] = useState<string>("");
  const [isSubscriptionLoading, setIsSubscriptionLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const activeParent = menu.find((item) =>
      item.subMenu?.some((sub) => sub.path === pathname)
    );
    if (activeParent) {
      setSubMenuOpenKey(activeParent.key);
    } else {
      setSubMenuOpenKey("");
    }
  }, [pathname, menu]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });

  const bottomLinkLabelSide = useCallback(
    (item: MenuItem) => {
      if (
        (item.key === "subscription" && isLoading) ||
        (item.key === "subscription" && isSubscriptionLoading)
      ) {
        return (
          <Spinner color="base.white.light" width={"20px"} height={"20px"} />
        );
      }
      if (
        item.key === "subscription" &&
        data?.data?.subscriptionStatus?.status
      ) {
        return `${capitalizeFirstLetter(data?.data?.subscriptionStatus?.status)} Plan ${data?.data?.subscriptionStatus?.expiresAt ? getDayFromISOString(data?.data?.subscriptionStatus?.expiresAt) + " Days Left" : ""}`;
      } else if (
        item.key === "subscription" &&
        !data?.data?.subscriptionStatus
      ) {
        return "Subscribe Now";
      } else {
        return item.label;
      }
    },
    [data?.data?.subscriptionStatus?.status, isSubscriptionLoading]
  );

  return (
    <Flex
      as="nav"
      direction="column"
      justify="space-between"
      bg={"secondary.950.light"}
      maxW={"304px"}
      padding={"32px 16px"}
      borderRadius={"16px"}
    >
      <Box>
        <Image
          src={logo.src}
          alt="logo"
          maxW={"240px"}
          mx={"auto"}
          mb={"40px"}
        />
        <List color={"base.white.light"}>
          {menu
            .filter(
              (item) =>
                item.key !== "Switch to Homepage" &&
                item.key !== "Log Out" &&
                item.key !== "View profile" &&
                item.key !== "subscription"
            )
            .map((item) => {
              const isActiveMain = pathname === item.path;
              const hasSubMenu = item.subMenu?.length;

              return (
                <ListItem key={item.key} my={"8px"}>
                  <Button
                    type="button"
                    color={"base.white.light"}
                    fontWeight={isActiveMain ? 700 : 500}
                    fontSize={"14px"}
                    bg={isActiveMain ? "secondary.800.light" : "transparent"}
                    width={"100%"}
                    gap={"16px"}
                    justifyContent={"flex-start"}
                    _hover={{ bg: "secondary.800.light" }}
                    _focus={{ bg: undefined }}
                    _active={{ bg: undefined }}
                    onClick={() => {
                      if (hasSubMenu) {
                        setSubMenuOpenKey((prev) =>
                          prev === item.key ? "" : item.key
                        );
                      } else {
                        handleNavigation(item.path);
                      }
                    }}
                  >
                    <Image
                      maxW={"24px"}
                      maxH={"24px"}
                      src={item.icon}
                      alt="icon"
                    />
                    <Text mr={"auto"}>{item.label}</Text>
                    {hasSubMenu && (
                      <AngleUpIcon
                        svg={{
                          width: "20px",
                          height: "20px",
                          style: {
                            transform:
                              subMenuOpenKey === item.key
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                            transitionDuration: "300ms",
                          },
                        }}
                        path={{ stroke: colors.base.white.light }}
                      />
                    )}
                  </Button>
                  {hasSubMenu && (
                    <List
                      maxH={subMenuOpenKey === item.key ? "300px" : 0}
                      transition={"max-height 300ms ease-in-out"}
                      overflow={"hidden"}
                    >
                      {item?.subMenu?.map((subItem) => {
                        const isActiveSub = pathname === subItem.path;
                        return (
                          <ListItem key={subItem.key}>
                            <Flex>
                              <Box
                                h={"40px"}
                                w={"1px"}
                                marginLeft={"30px"}
                                bg={"secondary.700.light"}
                              />
                              <Button
                                type="button"
                                color={
                                  isActiveSub
                                    ? "base.white.light"
                                    : "secondary.100.light"
                                }
                                fontWeight={isActiveSub ? 700 : 500}
                                fontSize={"14px"}
                                justifyContent={"flex-start"}
                                bg={
                                  isActiveSub
                                    ? "secondary.800.light"
                                    : "transparent"
                                }
                                gap={"16px"}
                                width={"100%"}
                                _hover={{ bg: "secondary.800.light" }}
                                _focus={{ bg: undefined }}
                                _active={{ bg: undefined }}
                                onClick={() => handleNavigation(subItem.path)}
                              >
                                {subItem.label}
                              </Button>
                            </Flex>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </ListItem>
              );
            })}
        </List>
      </Box>

      {/* Sabit Alt Menü */}
      <Box>
        {menu
          .filter(
            (item) =>
              item.key === "Switch to Homepage" ||
              item.key === "Log Out" ||
              item.key === "View profile" ||
              item.key === "subscription"
          )
          .map((item) => (
            <Button
              key={item.key}
              type="button"
              mt="12px"
              color={"base.white.light"}
              fontWeight={500}
              fontSize={"14px"}
              bg={"transparent"}
              width={"100%"}
              gap={"16px"}
              justifyContent={"flex-start"}
              _hover={{ bg: "secondary.800.light" }}
              _active={{ bg: undefined }}
              onClick={async () => {
                if (
                  item.key === "View profile" &&
                  data?.data?.isProfileComplete
                ) {
                  router.push(
                    item.path.replace(
                      ":providerId",
                      data?.data?.profileSlug as string
                    )
                  );
                  return;
                }
                if (
                  item.key === "View profile" &&
                  !data?.data?.isProfileComplete
                ) {
                  router.push("/provider-panel/dashboard");
                  return;
                }
                if (item.isLogout) {
                  logout();
                  if (role === "client") {
                    router.push("/client-sign-in");
                  } else if (role === "admin") {
                    router.push("/admin-sign-in");
                  } else if (role === "provider") {
                    router.push("/provider-sign-in");
                  }
                  return;
                }
                if (
                  item.key === "subscription" &&
                  !data?.data?.subscriptionStatus
                ) {
                  setIsSubscriptionModalOpen(true);
                  return;
                }

                if (
                  item.key === "subscription" &&
                  data?.data?.subscriptionStatus
                ) {
                  setIsSubscriptionLoading(true);
                  const response = await providerSubscriptonCancel();
                  if (response?.data?.success) {
                    window.open(response?.data?.data?.url, "_blank");
                    setIsSubscriptionLoading(false);
                    return;
                  }
                  setIsSubscriptionLoading(false);
                  return;
                }

                handleNavigation(item.path);
              }}
            >
              <Image maxW={"24px"} maxH={"24px"} src={item.icon} alt="icon" />
              <Flex mr={"auto"}>{bottomLinkLabelSide(item)}</Flex>
            </Button>
          ))}
      </Box>
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </Flex>
  );
};

export default Sidebar;
