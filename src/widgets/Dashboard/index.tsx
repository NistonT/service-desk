import { BarChartData, KPICards, LineChartData, PieChartData, Title } from "./ui";

export const Dashboard = () => {
  return (
    <div className="p-6 mt-6 bg-gray-50 min-h-screen">
      <Title />
      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartData />
        <PieChartData />
        <BarChartData />
      </div>
    </div>
  );
};
