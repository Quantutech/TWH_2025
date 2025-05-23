import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { colors } from "../../theme";

const data = [
  { name: "Jan", new: 300, returning: 700 },
  { name: "Mar", new: 350, returning: 730 },
  { name: "May", new: 400, returning: 760 },
  { name: "Jul", new: 380, returning: 790 },
  { name: "Sep", new: 470, returning: 800 },
  { name: "Nov", new: 450, returning: 820 },
  { name: "Dec", new: 600, returning: 880 },
];

const ReturningVsNewClientsChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      minWidth={"calc(100dvw - 900px)"}
      height={300}
    >
      <AreaChart
        data={data}
        margin={{ top: 10, right: 0, left: -25, bottom: 60 }}
      >
        <defs>
          <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4379EE" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#4379EE" stopOpacity={0} />
          </linearGradient>
        </defs>

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
          ticks={[0, 200, 400, 600, 800, 1000]}
        />
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="right"
          height={36}
          iconType="circle"
        />
        <Area
          type="monotone"
          dataKey="new"
          strokeWidth={3}
          fill={colors.base.white.light}
          name="New"
        />
        <Area
          type="monotone"
          dataKey="returning"
          stroke="#4379EE"
          strokeWidth={3}
          fill="url(#colorReturning)"
          name="Returning"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReturningVsNewClientsChart;
