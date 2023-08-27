import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableFiltersSchema, TableFiltersType } from '../types/tableFilters';
import { fetchTableFilters } from '../services/fetchTableFilters/fetchTableFilters';

const initialState: TableFiltersSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
};

const tableFiltersSlice = createSlice({
    name: 'tableFilters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableFilters.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTableFilters.fulfilled, (state, action: PayloadAction<TableFiltersType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTableFilters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: tableFiltersActions } = tableFiltersSlice;
export const { reducer: tableFiltersReducer } = tableFiltersSlice;
