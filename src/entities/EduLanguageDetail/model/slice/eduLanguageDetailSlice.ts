import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchEduLanguageDetail,
} from '../services/fetchEduLanguageDetail/fetchEduLanguageDetail';
import {
    EduLanguageDetailSchema,
    EduLanguageDetailType,
} from '../types/eduLanguageDetail';

const initialState: EduLanguageDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const eduLanguageDetailSlice = createSlice({
    name: 'eduLanguageDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEduLanguageDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEduLanguageDetail.fulfilled, (state, action: PayloadAction<EduLanguageDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchEduLanguageDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: eduLanguageDetailActions } = eduLanguageDetailSlice;
export const { reducer: eduLanguageDetailReducer } = eduLanguageDetailSlice;
