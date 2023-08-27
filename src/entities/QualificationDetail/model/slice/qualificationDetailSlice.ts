import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchQualificationDetail,
} from '../services/fetchQualificationDetail/fetchQualificationDetail';
import {
    QualificationDetailSchema,
    QualificationDetailType,
} from '../types/qualificationDetail';

const initialState: QualificationDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const qualificationDetailSlice = createSlice({
    name: 'qualificationDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQualificationDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchQualificationDetail.fulfilled, (state, action: PayloadAction<QualificationDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchQualificationDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: qualificationDetailActions } = qualificationDetailSlice;
export const { reducer: qualificationDetailReducer } = qualificationDetailSlice;
