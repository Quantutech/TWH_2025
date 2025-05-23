import { Box, Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import CalendarCircle from "@repo/ui/assets/statistics-boxes/calendar-circle.webp";
import CalendarRemove from "@repo/ui/assets/statistics-boxes/calendar-remove.webp";
import CalendarTick from "@repo/ui/assets/statistics-boxes/calendar-tick.webp";
import Calendar from "@repo/ui/assets/statistics-boxes/calendar.webp";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getProviderStatistics } from "../../utils/api";
const StatisticsBoxes = () => {
  const useProviderStatistics = () => {
    return useQuery({
      queryKey: ["provider-statistics"],
      queryFn: getProviderStatistics,
      select: (res) => res.data?.data,
    });
  };
  const { data, isLoading } = useProviderStatistics();

  if (isLoading) {
    return (
      <Flex w="100%" h="88px" justify="center" align="center">
        <Spinner />
      </Flex>
    );
  }
  return (
    <HStack w={"100%"} h={"88px"} gap={"16px"}>
      <Flex
        bg={"base.white.light"}
        h={"88px"}
        w={"100%"}
        borderRadius={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        padding={"16px"}
        gap={"24px"}
      >
        <HStack>
          <Box
            w={"56px"}
            h={"56px"}
            bg={"primary.100.light"}
            borderRadius={"16px"}
            padding={"16px"}
            gap={"8px"}
          >
            <Image src={CalendarCircle} width={48} height={48} alt="calendar" />
          </Box>
          <VStack w={"120px"} h={"56px"} gap={"8px"} alignItems={"flex-start"}>
            <Text
              color={"secondary.600.light"}
              fontSize={"12px"}
              fontWeight={"500"}
            >
              Total Appointments
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"20px"}
              fontWeight={"600"}
            >
              {data.total}
            </Text>
          </VStack>
        </HStack>
      </Flex>
      <Flex
        bg={"base.white.light"}
        h={"88px"}
        w={"100%"}
        borderRadius={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        padding={"16px"}
        gap={"24px"}
      >
        <HStack>
          <Box
            w={"56px"}
            h={"56px"}
            bg={"warning.100.light"}
            borderRadius={"16px"}
            padding={"16px"}
            gap={"8px"}
          >
            <Image src={Calendar} width={48} height={48} alt="calendar" />
          </Box>
          <VStack w={"136px"} h={"56px"} gap={"8px"} alignItems={"flex-start"}>
            <Text
              color={"secondary.600.light"}
              fontSize={"12px"}
              fontWeight={"500"}
            >
              Today Appointments
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"20px"}
              fontWeight={"600"}
            >
              {data.today}
            </Text>
          </VStack>
        </HStack>
      </Flex>
      <Flex
        bg={"base.white.light"}
        h={"88px"}
        w={"100%"}
        borderRadius={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        padding={"16px"}
        gap={"24px"}
      >
        <HStack>
          <Box
            w={"56px"}
            h={"56px"}
            bg={"success.100.light"}
            borderRadius={"16px"}
            padding={"16px"}
            gap={"8px"}
          >
            <Image src={CalendarTick} width={48} height={48} alt="calendar" />
          </Box>
          <VStack w={"148px"} h={"56px"} gap={"8px"} alignItems={"flex-start"}>
            <Text
              color={"secondary.600.light"}
              fontSize={"12px"}
              fontWeight={"500"}
            >
              Successful Appointments
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"20px"}
              fontWeight={"600"}
            >
              {data.completed}
            </Text>
          </VStack>
        </HStack>
      </Flex>
      <Flex
        bg={"base.white.light"}
        h={"88px"}
        w={"100%"}
        borderRadius={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        padding={"16px"}
        gap={"24px"}
      >
        <HStack>
          <Box
            w={"56px"}
            h={"56px"}
            bg={"error.100.light"}
            borderRadius={"16px"}
            padding={"16px"}
            gap={"8px"}
          >
            <Image src={CalendarRemove} width={48} height={48} alt="calendar" />
          </Box>
          <VStack w={"148px"} h={"56px"} gap={"8px"} alignItems={"flex-start"}>
            <Text
              color={"secondary.600.light"}
              fontSize={"12px"}
              fontWeight={"500"}
            >
              Canceled Appointments
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"20px"}
              fontWeight={"600"}
            >
              {data.canceled}
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default StatisticsBoxes;
