"use client";
import {
  Box,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import SearchIcon from "@repo/ui/components/icons/SearchIcon";
import { useState } from "react";
import { useNotificationsContext } from "../../../contexts/NotificationsContexts";
import AllNotifications from "./tabs/AllNotifications";
import AppointmentNotifications from "./tabs/AppointmentNotifications";
import Support from "./tabs/Support";

const ListOfNotificitons = () => {
  const {
    searchValue,
    setSearchValue,
    allNotificationDataCount,
    appointmentNotificationsDataCount,
    supportDataCount,
    setActiveTab,
  } = useNotificationsContext();
  const [filterButtonMouseOver, setFilterButtonMouseOver] =
    useState<boolean>(false);

  return (
    <Flex
      flexDirection={"column"}
      padding={"24px 16px"}
      bg={"base.white.light"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      mt={"24px"}
    >
      <Flex alignItems={"center"}>
        <Text
          mr={"auto"}
          fontWeight={600}
          fontSize={"20px"}
          color={"secondary.950.light"}
        >
          List of Notifications
        </Text>
        <Box position={"relative"}>
          <Input
            placeholder="Search"
            maxW={"240px"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            borderRadius={"8px"}
            padding={"12px 14px 12px 36px"}
            _placeholder={{
              color: "secondary.400.light",
              fontWeight: 400,
              fontsize: "14px",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon
            svg={{
              style: {
                width: "20px",
                height: "20px",
                position: "absolute",
                top: "10px",
                left: "8px",
              },
            }}
          />
        </Box>
        {/* <Button
          type="button"
          color={"primary.500.light"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          marginLeft={"16px"}
          _hover={{ bg: "primary.500.light", color: "base.white.light" }}
          _focus={{ bg: "primary.500.light", color: "base.white.light" }}
          _active={{ bg: "primary.500.light", color: "base.white.light" }}
          onMouseOver={() => {
            setFilterButtonMouseOver(true);
          }}
          onMouseLeave={() => {
            setFilterButtonMouseOver(false);
          }}
        >
          <FilterIcon
            svg={{ width: "20px", height: "20px" }}
            path={{ fill: filterButtonMouseOver ? "base.white.light" : "#3F96B4" }}
          />
          <Text marginLeft={"6px"} fontWeight={600} fontSize={"16px"}>
            Filters
          </Text>
        </Button> */}
      </Flex>
      <Tabs>
        <TabList>
          <Tab
            _selected={{
              color: "primary.600.light",
              borderBottom: "2px solid",
              borderColor: "primary.600.light",
            }}
            color={"secondary.500.light"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={() => setActiveTab("allNotifications")}
          >
            <Text>All Notifications</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {allNotificationDataCount || 0}
            </Text>
          </Tab>
          <Tab
            _selected={{
              color: "primary.600.light",
              borderBottom: "2px solid",
              borderColor: "primary.600.light",
            }}
            color={"secondary.500.light"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={() => {
              setActiveTab("appointmentNotifications");
            }}
          >
            <Text>Appointment Notifications</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {appointmentNotificationsDataCount || 0}
            </Text>
          </Tab>
          <Tab
            _selected={{
              color: "primary.600.light",
              borderBottom: "2px solid",
              borderColor: "primary.600.light",
            }}
            color={"secondary.500.light"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={() => setActiveTab("supportNotifications")}
          >
            <Text>Support</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {supportDataCount || 0}
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            paddingX={"0px"}
            pb={"0px"}
            overflow={"auto"}
            height={"calc(100dvh - 270px)"}
          >
            <AllNotifications />
          </TabPanel>
          <TabPanel
            paddingX={"0px"}
            pb={"0px"}
            overflow={"auto"}
            height={"calc(100dvh - 270px)"}
          >
            <AppointmentNotifications />
          </TabPanel>
          <TabPanel
            paddingX={"0px"}
            pb={"0px"}
            overflow={"auto"}
            height={"calc(100dvh - 270px)"}
          >
            <Support />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ListOfNotificitons;
