import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NationalitiesSchema } from 'entities/Nationalities';
import { NationalitiesData } from 'entities/Nationalities/model/types/nationalities';
import { fetchNationalities } from '../services/fetchNationalities/fetchNationalities';

const initialState: NationalitiesSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const nationalitiesSlice = createSlice({
    name: 'nationalities',
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
            .addCase(fetchNationalities.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNationalities.fulfilled, (state, action: PayloadAction<NationalitiesData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchNationalities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: nationalitiesActions } = nationalitiesSlice;
export const { reducer: nationalitiesReducer } = nationalitiesSlice;
