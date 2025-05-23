"use client";
import { CSSProperties, useMemo, useState } from "react";
import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Flex,
  Spinner,
  MenuButtonProps,
  TextProps,
  StackProps,
  FlexProps,
} from "@chakra-ui/react";
import { useAuth } from "@repo/ui/components/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";
import { adminGetMe, clientGetMe, providerGetMe } from "../../utils/api";
import ProfileImage from "./ProfileImage";
import DashboardIcon from "../icons/DashboardIcon";
import ProfileIcon from "../icons/ProfileIcon";
import DateIcon from "../icons/DateIcon";
import NotificationIcon from "../icons/NotificationIcon";
import LogoutIcon from "../icons/LogoutIcon";

const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;

interface Props {
  activeProject?: "landing" | "directory" | "admin";
  role?: string;
  menuButtonProps?: MenuButtonProps | FlexProps;
  emailTextProps?: TextProps;
  firstAndLastNameContainerProps?: StackProps;
  rightArrowIconProps?: CSSProperties;
  mainContainerProps?: StackProps;
}

const Profile = ({
  activeProject = "directory",
  menuButtonProps,
  emailTextProps,
  firstAndLastNameContainerProps,
  rightArrowIconProps,
  mainContainerProps,
  role,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });

  const { data: clientData, isLoading: isClientLoading } = useQuery({
    queryKey: ["clientGetMe"],
    queryFn: () => clientGetMe(),
    retry: false,
  });

  const { data: adminData, isLoading: isadminLoading } = useQuery({
    queryKey: ["adminGetMe"],
    queryFn: () => adminGetMe(),
    retry: false,
  });

  const dropdownMenuItem = useMemo(() => {
    if (role === "client") {
      return [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: DashboardIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/client-panel/dashboard`);
              return;
            }
            router.push("/client-panel/dashboard");
          },
        },
        {
          key: "profileManagement",
          label: "Profile Management",
          icon: ProfileIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/client-panel/profile-management`);
              return;
            }
            router.push("/client-panel/profile-management");
          },
        },
        {
          key: "appointments",
          label: "Appointments",
          icon: DateIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/client-panel/appointments`);
              return;
            }
            router.push("/client-panel/appointments");
          },
        },
        {
          key: "notifications",
          label: "Notifications",
          icon: NotificationIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/client-panel/notifications`);
              return;
            }
            router.push("/client-panel/notifications");
          },
        },
        {
          key: "logout",
          label: "Log out",
          icon: LogoutIcon,
          onClick: () => {
            if (activeProject === "landing") {
              logout();
              router.push(`${directoryUrl}/client-sign-in`);
              return;
            }
            logout();
            router.push("/client-sign-in");
          },
        },
      ];
    } else if (role === "provider") {
      return [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: DashboardIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/provider-panel/dashboard`);
              return;
            }
            router.push("/provider-panel/dashboard");
          },
        },
        {
          key: "profileManagement",
          label: "Profile Management",
          icon: ProfileIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/provider-panel/profile-management`);
              return;
            }
            router.push("/provider-panel/profile-management");
          },
        },
        {
          key: "appointments",
          label: "Appointments",
          icon: DateIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/provider-panel/appointments`);
              return;
            }
            router.push("/provider-panel/appointments");
          },
        },
        {
          key: "notifications",
          label: "Notifications",
          icon: NotificationIcon,
          onClick: () => {
            if (activeProject === "landing") {
              router.push(`${directoryUrl}/provider-panel/notifications`);
              return;
            }
            router.push("/provider-panel/notifications");
          },
        },
        {
          key: "logout",
          label: "Log out",
          icon: LogoutIcon,
          onClick: () => {
            if (activeProject === "landing") {
              logout();
              router.push(`${directoryUrl}/provider-sign-in`);
              return;
            }
            logout();
            router.push("/provider-sign-in");
          },
        },
      ];
    } else if (role === "admin") {
      return [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: DashboardIcon,
          onClick: () => {
            router.push("/dashboard");
          },
        },
        {
          key: "logout",
          label: "Log out",
          icon: LogoutIcon,
          onClick: () => {
            logout();
            router.push("/admin-sign-in");
          },
        },
      ];
    } else {
      return [];
    }
  }, [role]);

  return (
    <Stack {...mainContainerProps}>
      {isLoading || isClientLoading || isadminLoading ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"240px"}
          height={"100%"}
        >
          <Spinner color="secondary.500.light" />
        </Flex>
      ) : (
        <Menu
          placement="bottom"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <MenuButton
            borderRadius={"8px"}
            _hover={{ bg: "secondary.50.light" }}
            onClick={() => setIsOpen((prev) => !prev)}
            {...(menuButtonProps as MenuButtonProps)}
          >
            <Flex
              padding={{ base: "4px 8px", xl: "8px 12px" }}
              alignItems={"center"}
              gap={{ base: "8px", xl: "16px" }}
              borderRadius={"8px"}
              zIndex={100}
              {...(menuButtonProps as FlexProps)}
            >
              <HStack gap={{ base: "8px", xl: "16px" }} alignItems="center">
                <ProfileImage
                  profileImageUrl={
                    data?.data?.profileImageUrl ||
                    clientData?.data?.profileImageUrl ||
                    adminData?.data?.profileImageUrl
                  }
                  firstName={
                    data?.data?.firstName ||
                    clientData?.data?.firstName ||
                    adminData?.data?.firstName
                  }
                  lastName={
                    data?.data?.lastName ||
                    clientData?.data?.lastName ||
                    adminData?.data?.lastName
                  }
                />
                <Stack
                  spacing="0"
                  maxW={"160px"}
                  overflow={"hidden"}
                  {...firstAndLastNameContainerProps}
                >
                  <Text
                    fontWeight={600}
                    fontSize={"16px"}
                    color={"secondary.950.light"}
                    textAlign={"start"}
                    whiteSpace={"nowrap"}
                  >
                    {data?.data?.firstName ||
                      clientData?.data?.firstName ||
                      adminData?.data?.firstName}{" "}
                    {data?.data?.lastName ||
                      clientData?.data?.lastName ||
                      adminData?.data?.lastName}
                  </Text>
                  <Text
                    color="secondary.600.light"
                    fontSize={"16px"}
                    fontWeight={400}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    maxW={"160px"}
                    {...emailTextProps}
                  >
                    {data?.data?.email ||
                      clientData?.data?.email ||
                      adminData?.data?.email}
                  </Text>
                </Stack>
              </HStack>
              <IoChevronDownOutline
                style={{
                  width: "20px",
                  height: "20px",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transitionDuration: "200ms",
                  ...rightArrowIconProps,
                }}
              />
            </Flex>
          </MenuButton>

          <MenuList width={"100%"}>
            {dropdownMenuItem.map(({ key, icon: Icon, label, onClick }) => {
              return (
                <MenuItem
                  key={key}
                  onClick={onClick}
                  alignItems={"center"}
                  gap={"8px"}
                  _hover={{ bg: "secondary.50.light" }}
                  transitionDuration={"200ms"}
                  borderTop={key === "logout" ? "1px solid" : undefined}
                  borderColor={
                    key === "logout" ? "secondary.100.light" : undefined
                  }
                >
                  <Icon svg={{ width: "16px", height: "16px" }} />
                  <Text
                    color={"secondary.950.light"}
                    fontWeight={500}
                    fontSize={"14px"}
                  >
                    {label}
                  </Text>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </Stack>
  );
};

export default Profile;
