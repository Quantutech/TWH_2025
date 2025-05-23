import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { colors } from "../../theme";

const data = [
  { name: "Jan", value: 23000 },
  { name: "Feb", value: 45000 },
  { name: "Mar", value: 40000 },
  { name: "Apr", value: 84366.77 },
  { name: "May", value: 47000 },
  { name: "Jun", value: 52000 },
  { name: "Jul", value: 21000 },
  { name: "Aug", value: 49000 },
  { name: "Sep", value: 61000 },
  { name: "Oct", value: 54000 },
  { name: "Nov", value: 43000 },
  { name: "Dec", value: 49000 },
];

const TotalRevenueChart = () => {
  return (
    <ResponsiveContainer width={"100%"} minWidth={"calc(100dvw - 724px)"}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: -20,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(67,121,238)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          tick={{ fill: colors.secondary["500"].light }}
          dataKey="name"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(value) => `${value / 1000}K`}
          ticks={[20000, 40000, 60000, 80000, 100000]}
          tick={{ fill: colors.secondary["500"].light }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Area
          type="linear"
          dataKey="value"
          stroke="#4379EE"
          fill="url(#strokeGradient)"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TotalRevenueChart;
