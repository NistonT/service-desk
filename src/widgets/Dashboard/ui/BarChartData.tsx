import { TitleChart } from "@/shared/ui";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { employmentData } from "../lib/data";

export const BarChartData = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
      <TitleChart>Распределение по типу занятости</TitleChart>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={employmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" vertical={false} />
            <XAxis dataKey="name" stroke="black" fontSize={14} tickLine={false} axisLine={false} />
            <YAxis stroke="gray" fontSize={14} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="value" fill="purple" radius={[4, 4, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
