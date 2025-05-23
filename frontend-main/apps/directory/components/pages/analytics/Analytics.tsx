"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import CustomSelect from "@repo/ui/components/elements/CustomSelect";
import AppointmentDetailsChart from "@repo/ui/components/graphics/AppointmentDetailsChart";
import PeakTimesChart from "@repo/ui/components/graphics/PeakTimesChart";
import ReturningVsNewClientsChart from "@repo/ui/components/graphics/ReturningVsNewClientsChart";
import StatisticsBoxes from "@repo/ui/components/graphics/StatisticsBoxes";
import TotalRevenueChart from "@repo/ui/components/graphics/TotalRevenueChart";
import { CustomSelectOption } from "@repo/ui/utils/type";
import { useState } from "react";
const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState<CustomSelectOption>({
    value: "month",
    label: "Monthly",
  });
  const [appointmentType, setAppointmentType] = useState<CustomSelectOption>({
    value: "daily",
    label: "Daily",
  });
  return (
    <Box mt={4} height={"calc(100dvh - 128px)"} overflow={"auto"}>
      <StatisticsBoxes />
      <HStack mt={4}>
        <Box
          height="368px"
          borderRadius={"16px"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"24px 16px 24px 16px"}
          gap={"16px"}
        >
          <HStack justify={"space-between"}>
            <Box w={"116px"} h={"24px"}>
              <Text fontWeight={"600"} fontSize={"16px"}>
                Total Revenue
              </Text>
            </Box>
            <Box>
              <CustomSelect
                options={[
                  { value: "week", label: "Weekly" },
                  { value: "month", label: "Monthly" },
                ]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                containerProps={{ w: "95px", h: "34px" }}
              />
            </Box>
          </HStack>
          <TotalRevenueChart />
        </Box>
        <Box
          height="368px"
          w="336px"
          borderRadius={"16px"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"24px 16px 24px 16px"}
          gap={"16px"}
        >
          <HStack h={"34px"} w={"304px"} justify={"space-between"}>
            <Box w={"168px"} h={"24px"}>
              <Text fontWeight={"600"} fontSize={"16px"}>
                Appointment Details
              </Text>
            </Box>
            <Box>
              <CustomSelect
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                  { value: "yearly", label: "Yearly" },
                ]}
                selectedOption={appointmentType}
                setSelectedOption={setAppointmentType}
                containerProps={{ w: "95px", h: "34px" }}
              />
            </Box>
          </HStack>
          <AppointmentDetailsChart
            selectedType={appointmentType?.value as any}
          />
        </Box>
      </HStack>
      <HStack mt={4}>
        <Box
          height="306px"
          borderRadius={"16px"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"24px 16px 24px 16px"}
          gap={"16px"}
        >
          <HStack h={"34px"} justify={"space-between"}>
            <Box h={"24px"}>
              <Text fontWeight={"600"} fontSize={"16px"}>
                Returning vs New Clients
              </Text>
            </Box>
            <Box>
              <CustomSelect
                options={[
                  { value: "week", label: "Weekly" },
                  { value: "month", label: "Monthly" },
                ]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                containerProps={{ w: "95px", h: "34px" }}
              />
            </Box>
          </HStack>
          <ReturningVsNewClientsChart />
        </Box>
        <Box
          height="306px"
          w="512px"
          borderRadius={"16px"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          padding={"24px 16px 24px 16px"}
          gap={"16px"}
        >
          <HStack h={"34px"} w={"480px"} justify={"space-between"}>
            <Box w={"186px"} h={"24px"}>
              <Text fontWeight={"600"} fontSize={"16px"}>
                Peak Times
              </Text>
            </Box>
            <Box>
              <CustomSelect
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                  { value: "yearly", label: "Yearly" },
                ]}
                selectedOption={appointmentType}
                setSelectedOption={setAppointmentType}
                containerProps={{ w: "95px", h: "34px" }}
              />
            </Box>
          </HStack>
          <PeakTimesChart selectedType={appointmentType?.value as any} />
        </Box>
      </HStack>
    </Box>
  );
};

export default Analytics;
