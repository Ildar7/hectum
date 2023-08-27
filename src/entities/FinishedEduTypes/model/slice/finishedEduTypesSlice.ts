import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FinishedEduTypesSchema } from 'entities/FinishedEduTypes';
import { FinishedEduTypesData } from 'entities/FinishedEduTypes/model/types/finishedEduTypes';
import { fetchFinishedEduTypes } from '../services/fetchFinishedEduTypes/fetchFinishedEduTypes';

const initialState: FinishedEduTypesSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const finishedEduTypesSlice = createSlice({
    name: 'finishedEduTypes',
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
            .addCase(fetchFinishedEduTypes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchFinishedEduTypes.fulfilled, (state, action: PayloadAction<FinishedEduTypesData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchFinishedEduTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: finishedEduTypesActions } = finishedEduTypesSlice;
export const { reducer: finishedEduTypesReducer } = finishedEduTypesSlice;
