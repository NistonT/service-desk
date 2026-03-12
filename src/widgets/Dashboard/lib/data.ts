import { CITIZEN_MOCK_DATA } from "@/entities/citizen/model/constants/mockData";

export const registrationData = CITIZEN_MOCK_DATA.reduce((acc: { name: string; count: 1 }[], citizen) => {
  const date = new Date(citizen.createdAt);
  const monthKey = date.toLocaleString("ru-RU", { month: "short", year: "2-digit" });

  const existing = acc.find((item) => item.name === monthKey);
  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ name: monthKey, count: 1 });
  }
  return acc;
}, []).sort((a, b) => {
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const aMonth = months.indexOf(a.name.split(" ")[0]);
  const bMonth = months.indexOf(b.name.split(" ")[0]);
  return aMonth - bMonth;
});

export const statusData = [
  { name: "Активные", value: CITIZEN_MOCK_DATA.filter((c) => c.status === "active").length, color: "#4ade80" },
  { name: "Ожидают", value: CITIZEN_MOCK_DATA.filter((c) => c.status === "pending").length, color: "#fbbf24" },
  { name: "Архив", value: CITIZEN_MOCK_DATA.filter((c) => c.status === "archived").length, color: "#9ca3af" },
  { name: "Заблокированы", value: CITIZEN_MOCK_DATA.filter((c) => c.status === "blocked").length, color: "#f87171" },
].filter((item) => item.value > 0);

export const employmentData = [
  { name: "Полный день", value: CITIZEN_MOCK_DATA.filter((c) => c.employmentType === "full_time").length },
  { name: "Самозанятые", value: CITIZEN_MOCK_DATA.filter((c) => c.employmentType === "self_employed").length },
  { name: "Пенсионеры", value: CITIZEN_MOCK_DATA.filter((c) => c.employmentType === "pensioner").length },
  { name: "Студенты", value: CITIZEN_MOCK_DATA.filter((c) => c.employmentType === "student").length },
  { name: "Безработные", value: CITIZEN_MOCK_DATA.filter((c) => c.employmentType === "unemployed").length },
];

export const totalCitizens = CITIZEN_MOCK_DATA.length;
export const vipCount = CITIZEN_MOCK_DATA.filter((c) => c.isVIP).length;
export const avgAge = Math.round(CITIZEN_MOCK_DATA.reduce((acc, c) => acc + c.age, 0) / totalCitizens);
export const withChildren = CITIZEN_MOCK_DATA.filter((c) => c.hasChildren).length;
