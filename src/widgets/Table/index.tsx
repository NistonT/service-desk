import { Citizen, CitizenFilters, PaginationParams } from "@/entities/citizen/model/types/citizen";
import { useCitizenData } from "@/shared/lib/hooks/useCitizenData";
import { useCallback, useState } from "react";
import { CitizenTable } from "./ui/CitizenTable";
import { FilterPanel } from "./ui/FilterPanel";
import { Pagination } from "./ui/Pagination";

const navigateToDetail = (id: string) => {
  console.log(`Navigate to citizen: ${id}`);
};

export const Registry = () => {
  const [filters, setFilters] = useState<CitizenFilters>({});

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 25,
    sortBy: "lastName",
    sortOrder: "asc",
  });

  const { paginatedData, total, totalPages, hasPrev, hasNext } = useCitizenData(filters, pagination);

  const handleSort = useCallback((key: keyof Citizen) => {
    setPagination((prev) => ({
      ...prev,
      sortBy: key,
      sortOrder: prev.sortBy === key && prev.sortOrder === "asc" ? "desc" : "asc",
      page: 1,
    }));
  }, []);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleRowClick = (citizen: Citizen) => {
    navigateToDetail(citizen.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Картотека граждан</h1>
        <p className="text-gray-500">Управление базой данных граждан</p>
      </div>

      <FilterPanel filters={filters} setFilters={setFilters} onReset={handleResetFilters} totalFound={total} />

      <CitizenTable
        citizens={paginatedData}
        onRowClick={handleRowClick}
        sortBy={pagination.sortBy}
        sortOrder={pagination.sortOrder}
        onSort={handleSort}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        limit={pagination.limit}
        onLimitChange={handleLimitChange}
        totalItems={total}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
};
