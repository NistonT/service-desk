import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CITIZEN_MOCK_DATA } from "../model/constants/mockData";
import type { Citizen, CitizenFilters, PaginationParams } from "../model/types/citizen";

interface CitizenState {
  items: Citizen[];
  current: Citizen | null;
  filters: CitizenFilters;
  pagination: PaginationParams;
  total: number;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
}

const initialState: CitizenState = {
  items: CITIZEN_MOCK_DATA,
  current: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 25,
    sortBy: "lastName",
    sortOrder: "asc",
  },
  total: CITIZEN_MOCK_DATA.length,
  loading: false,
  error: null,
  isEditing: false,
};

export const fetchCitizenById = createAsyncThunk("citizen/fetchById", async (id: string): Promise<Citizen> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const citizen = CITIZEN_MOCK_DATA.find((c) => c.id === id);
  if (!citizen) throw new Error("Citizen not found");
  return citizen;
});

export const updateCitizen = createAsyncThunk("citizen/update", async (citizen: Citizen): Promise<Citizen> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ...citizen, updatedAt: new Date().toISOString() };
});

export const citizenSlice = createSlice({
  name: "citizen",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<CitizenFilters>) => {
      state.filters = action.payload;
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationParams>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setCurrentCitizen: (state, action: PayloadAction<Citizen | null>) => {
      state.current = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitizenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitizenById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCitizenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateCitizen.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isEditing = false;
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setFilters, setPagination, setCurrentCitizen, setIsEditing, clearError } = citizenSlice.actions;

export default citizenSlice.reducer;
