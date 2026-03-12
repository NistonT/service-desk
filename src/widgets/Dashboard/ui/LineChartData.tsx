import { TitleChart } from "@/shared/ui";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { registrationData } from "../lib/data";

export const LineChartData = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <TitleChart>Динамика регистрации</TitleChart>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <XAxis dataKey="name" stroke="gray" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="gray" fontSize={14} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="blue"
              strokeWidth={3}
              dot={{ fill: "blue", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "blue" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
