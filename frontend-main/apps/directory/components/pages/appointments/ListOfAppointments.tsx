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
import { useAppointmentsContext } from "../../../contexts/AppointmentsContexts";
import CancelledTab from "./tabs/CancelledTab";
import PastTab from "./tabs/PastTab";
import UpcomingTab from "./tabs/UpcomingTab";

const ListOfAppointments = () => {
  const {
    searchValue,
    setSearchValue,
    upcomingDataCount,
    pastDataCount,
    cancelDataCount,
  } = useAppointmentsContext();
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
          List of Appointments
        </Text>
        {/* Search Input */}
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
        {/* Filter button */}
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
          >
            <Text>Upcoming</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {upcomingDataCount || 0}
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
          >
            <Text>Past</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {pastDataCount || 0}
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
          >
            <Text>Cancelled</Text>
            <Text
              bg={"primary.100.light"}
              borderRadius={"99999px"}
              padding={"2px 8px"}
              marginLeft={"4px"}
            >
              {cancelDataCount || 0}
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
            <UpcomingTab />
          </TabPanel>
          <TabPanel
            paddingX={"0px"}
            pb={"0px"}
            overflow={"auto"}
            height={"calc(100dvh - 270px)"}
          >
            <PastTab />
          </TabPanel>
          <TabPanel
            paddingX={"0px"}
            pb={"0px"}
            overflow={"auto"}
            height={"calc(100dvh - 270px)"}
          >
            <CancelledTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ListOfAppointments;
