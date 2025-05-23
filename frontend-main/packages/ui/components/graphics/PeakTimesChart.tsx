import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../theme";
import { Box, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentPeakGraphic } from "../../utils/api";
interface Props {
  selectedType: string;
}

const dayMap: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const orderedDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PeakTimesChart = ({ selectedType }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["appointment-peak-graphic", selectedType],
    queryFn: () => getAppointmentPeakGraphic(selectedType),
    enabled: !!selectedType,
  });

  const chartData = orderedDays.map((day) => {
    const match = data?.data?.find(
      (item: { day: string }) => item.day.trim() === day
    );
    return {
      name: dayMap[day],
      value: match ? Number(match.appointment_count) : 0,
    };
  });

  if (isLoading) {
    return (
      <Box h="240px" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 0, left: -20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: colors.secondary["500"].light, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: colors.secondary["500"].light, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          ticks={[0, 2, 4, 6, 8, 10]}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#4A90E2"
          barSize={40}
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="#4A90E2" stroke="#4A90E2" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PeakTimesChart;
