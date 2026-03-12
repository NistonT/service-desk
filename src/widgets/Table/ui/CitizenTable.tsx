import { Citizen } from "@/entities/citizen/model/types/citizen";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { CitizenRow } from "./CitizenRow";

interface CitizenTableProps {
  citizens: Citizen[];
  onRowClick: (citizen: Citizen) => void;
  sortBy?: keyof Citizen;
  sortOrder?: "asc" | "desc";
  onSort: (key: keyof Citizen) => void;
}

const ROW_HEIGHT = 56;
const TABLE_HEIGHT = 540;

const HeaderCell = ({
  label,
  width,
  sortKey,
  currentSort,
  order,
  onSort,
}: {
  label: string;
  width: string;
  sortKey?: keyof Citizen;
  currentSort?: keyof Citizen;
  order?: "asc" | "desc";
  onSort?: (key: keyof Citizen) => void;
}) => (
  <div
    className={`flex-shrink-0 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 select-none border-r border-gray-200 last:border-r-0 ${width}`}
    onClick={() => sortKey && onSort?.(sortKey)}
  >
    <div className="flex items-center gap-1">
      {label}
      {currentSort === sortKey && <span className="text-blue-500">{order === "asc" ? "↑" : "↓"}</span>}
    </div>
  </div>
);

interface RowData {
  citizens: Citizen[];
  onRowClick: (citizen: Citizen) => void;
}

export const CitizenTable = ({ citizens, onRowClick, sortBy, sortOrder, onSort }: CitizenTableProps) => {
  if (citizens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Граждане не найдены</p>
      </div>
    );
  }

  const itemData: RowData = { citizens, onRowClick };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
        <HeaderCell label="ФИО" width="w-[280px]" sortKey="fullName" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Дата рождения" width="w-[130px]" sortKey="dateOfBirth" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Возраст" width="w-[80px]" sortKey="age" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Организация" width="w-[200px]" sortKey="currentOrganization" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Должность" width="w-[180px]" sortKey="currentPosition" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Статус" width="w-[120px]" sortKey="status" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <HeaderCell label="Ответственный" width="w-[150px]" sortKey="responsibleUserName" currentSort={sortBy} order={sortOrder} onSort={onSort} />
        <div className="flex-1 border-r border-gray-200 last:border-r-0"></div>
      </div>

      <div className="flex-1 overflow-hidden">
        <FixedSizeList height={TABLE_HEIGHT} width="100%" itemCount={citizens.length} itemSize={ROW_HEIGHT} itemData={itemData} overscanCount={5}>
          {({ index, style, data }: ListChildComponentProps<RowData>) => <CitizenRow index={index} style={style} data={data} />}
        </FixedSizeList>
      </div>

      <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-t border-gray-200">Показано {citizens.length} записей</div>
    </div>
  );
};
