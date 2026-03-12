import { CitizenFilters } from "@/entities/citizen/model/types/citizen";
import React from "react";

interface FilterPanelProps {
  filters: CitizenFilters;
  setFilters: React.Dispatch<React.SetStateAction<CitizenFilters>>;
  onReset: () => void;
  totalFound: number;
}

export const FilterPanel = ({ filters, setFilters, onReset, totalFound }: FilterPanelProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const toggleStatus = (status: string) => {
    setFilters((prev) => {
      const current = prev.status || [];
      const updated = current.includes(status) ? current.filter((s) => s !== status) : [...current, status];
      return { ...prev, status: updated };
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
          <input
            type="text"
            placeholder="ФИО, ИНН..."
            value={filters.search || ""}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
          <div className="flex gap-2">
            {["active", "pending", "archived", "blocked"].map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  filters.status?.includes(status)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status === "active" ? "Активен" : status === "pending" ? "Ожидает" : status === "archived" ? "Архив" : "Блок"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Только VIP</label>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, isVIP: prev.isVIP ? undefined : true }))}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
              filters.isVIP ? "bg-yellow-100 text-yellow-800 border-yellow-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            VIP
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Найдено: <span className="font-bold text-gray-900">{totalFound}</span>
          </div>
          <button onClick={onReset} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
