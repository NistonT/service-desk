import { StatCard } from "@/shared/ui";
import { avgAge, totalCitizens, vipCount, withChildren } from "../lib/data";

export const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Всего граждан" value={totalCitizens} subtitle="В базе данных" color="blue" />
      <StatCard title="VIP клиенты" value={vipCount} subtitle={`${((vipCount / totalCitizens) * 100).toFixed(1)}% от всех`} color="purple" />
      <StatCard title="Средний возраст" value={`${avgAge} лет`} subtitle="По всем записям" color="green" />
      <StatCard title="Есть дети" value={withChildren} subtitle={`${((withChildren / totalCitizens) * 100).toFixed(1)}% граждан`} color="orange" />
    </div>
  );
};
