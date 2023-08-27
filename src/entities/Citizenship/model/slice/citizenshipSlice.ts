import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitizenshipSchema } from 'entities/Citizenship';
import { CitizenshipData } from 'entities/Citizenship/model/types/citizenship';
import { fetchCitizenship } from '../services/fetchCitizenship/fetchCitizenship';

const initialState: CitizenshipSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const citizenshipSlice = createSlice({
    name: 'citizenship',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<string>) => {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitizenship.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCitizenship.fulfilled, (state, action: PayloadAction<CitizenshipData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchCitizenship.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: citizenshipActions } = citizenshipSlice;
export const { reducer: citizenshipReducer } = citizenshipSlice;
