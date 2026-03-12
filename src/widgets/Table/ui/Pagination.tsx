export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, limit, onLimitChange, totalItems, hasPrev, hasNext }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-6 bg-white px-4 py-3 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Показывать по:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm text-gray-500 ml-2">Всего: {totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Назад
        </button>

        <span className="text-sm text-gray-700 px-2">
          Страница {currentPage} из {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Вперед
        </button>
      </div>
    </div>
  );
};
