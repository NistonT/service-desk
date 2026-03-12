import { CITIZEN_MOCK_DATA } from "@/entities/citizen/model/constants/mockData";
import { CitizenFilters, PaginationParams } from "@/entities/citizen/model/types/citizen";
import { useMemo } from "react";

export const useCitizenData = (filters: CitizenFilters, pagination: PaginationParams) => {
  const filteredData = useMemo(() => {
    return CITIZEN_MOCK_DATA.filter((citizen) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = citizen.fullName.toLowerCase().includes(searchLower);
        const matchesInn = citizen.inn?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesInn) return false;
      }

      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(citizen.status)) return false;
      }

      if (filters.gender && filters.gender.length > 0) {
        if (!filters.gender.includes(citizen.gender)) return false;
      }

      if (filters.city && filters.city.length > 0) {
        const hasCity = citizen.addresses.some((addr) => filters.city!.some((c) => addr.city.toLowerCase().includes(c.toLowerCase())));
        if (!hasCity) return false;
      }

      if (filters.isVIP !== undefined && citizen.isVIP !== filters.isVIP) return false;

      return true;
    });
  }, [filters]);

  const sortedData = useMemo(() => {
    if (!pagination.sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[pagination.sortBy!];
      const bValue = b[pagination.sortBy!];

      if (aValue === undefined || bValue === undefined) return 0;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return pagination.sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredData, pagination.sortBy, pagination.sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    return sortedData.slice(start, end);
  }, [sortedData, pagination.page, pagination.limit]);

  const total = sortedData.length;
  const totalPages = Math.ceil(total / pagination.limit);

  return {
    paginatedData,
    total,
    totalPages,
    hasPrev: pagination.page > 1,
    hasNext: pagination.page < totalPages,
  };
};
