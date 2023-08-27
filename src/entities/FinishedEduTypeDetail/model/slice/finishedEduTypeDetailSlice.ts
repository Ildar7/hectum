import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchFinishedEduTypeDetail,
} from '../services/fetchFinishedEduTypeDetail/fetchFinishedEduTypeDetail';
import {
    FinishedEduTypeDetailSchema,
    FinishedEduTypeDetailType,
} from '../types/finishedEduTypeDetail';

const initialState: FinishedEduTypeDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const finishedEduTypeDetailSlice = createSlice({
    name: 'finishedEduTypeDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFinishedEduTypeDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchFinishedEduTypeDetail.fulfilled, (state, action: PayloadAction<FinishedEduTypeDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchFinishedEduTypeDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: finishedEduTypeDetailActions } = finishedEduTypeDetailSlice;
export const { reducer: finishedEduTypeDetailReducer } = finishedEduTypeDetailSlice;
