import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentTypeStats } from "../../utils/api";

const COLORS = [colors.secondary["500"].light, "#A8D3EF"];

interface Props {
  selectedType: string;
}

const AppointmentDetailsChart = ({ selectedType }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["appointment-type-stats", selectedType],
    queryFn: () => getAppointmentTypeStats(selectedType),
    enabled: !!selectedType,
  });

  if (isLoading) {
    return (
      <Box h="240px" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  const chartData = [
    { name: "Online Appt", value: data?.online ?? 0 },
    { name: "In Person Appt", value: data?.inperson ?? 0 },
  ];

  return (
    <Box>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={50}
            outerRadius={100}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value.toLocaleString()}`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <HStack justify="center" gap={10}>
        {chartData.map((item, index) => (
          <VStack align="center" key={item.name}>
            <HStack>
              <Box w="10px" h="10px" borderRadius="full" bg={COLORS[index]} />
              <Text fontSize="sm" color="secondary.500.light">
                {item.name}
              </Text>
            </HStack>
            <Text fontWeight="bold">{item.value.toLocaleString()}</Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default AppointmentDetailsChart;
