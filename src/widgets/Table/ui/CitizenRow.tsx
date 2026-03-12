import { Citizen } from "@/entities/citizen/model/types/citizen";
import React from "react";
import { useNavigate } from "react-router";
import { ListChildComponentProps } from "react-window";

interface RowData {
  citizens: Citizen[];
  onRowClick: (citizen: Citizen) => void;
}

type CitizenRowProps = ListChildComponentProps<RowData>;

export const CitizenRow = React.memo(({ index, style, data }: CitizenRowProps) => {
  const citizen = data.citizens[index];

  const navigate = useNavigate();
  if (!citizen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      style={style}
      className="absolute w-full flex items-center border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
      onClick={() => {
        data.onRowClick(citizen);
        navigate(`/citizen/${citizen.id}`);
      }}
      role="row"
    >
      <div className="flex-shrink-0 w-[280px] px-4 py-3 truncate font-medium text-gray-900 border-r border-gray-100" title={citizen.fullName}>
        {citizen.fullName}
      </div>
      <div className="flex-shrink-0 w-[130px] px-4 py-3 truncate text-gray-600 border-r border-gray-100" title={citizen.dateOfBirth}>
        {citizen.dateOfBirth}
      </div>
      <div className="flex-shrink-0 w-[80px] px-4 py-3 truncate text-gray-600 border-r border-gray-100">{citizen.age} лет</div>
      <div className="flex-shrink-0 w-[200px] px-4 py-3 truncate text-gray-600 border-r border-gray-100" title={citizen.currentOrganization}>
        {citizen.currentOrganization || "—"}
      </div>
      <div className="flex-shrink-0 w-[180px] px-4 py-3 truncate text-gray-600 border-r border-gray-100" title={citizen.currentPosition}>
        {citizen.currentPosition || "—"}
      </div>
      <div className="flex-shrink-0 w-[120px] px-4 py-3 border-r border-gray-100">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(citizen.status)}`}>
          {citizen.status === "active"
            ? "Активен"
            : citizen.status === "pending"
              ? "Ожидает"
              : citizen.status === "archived"
                ? "Архив"
                : "Заблокирован"}
        </span>
      </div>
      <div className="flex-shrink-0 w-[150px] px-4 py-3 truncate text-gray-600 border-r border-gray-100" title={citizen.responsibleUserName}>
        {citizen.responsibleUserName}
      </div>
      <div className="flex-1 border-r border-gray-100 last:border-r-0"></div>
    </div>
  );
});

CitizenRow.displayName = "CitizenRow";
