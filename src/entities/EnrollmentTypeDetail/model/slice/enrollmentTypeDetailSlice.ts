import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchEnrollmentTypeDetail,
} from '../services/fetchEnrollmentTypeDetail/fetchEnrollmentTypeDetail';
import {
    EnrollmentTypeDetailSchema,
    EnrollmentTypeDetailType,
} from '../types/enrollmentTypeDetail';

const initialState: EnrollmentTypeDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const enrollmentTypeDetailSlice = createSlice({
    name: 'enrollmentTypeDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnrollmentTypeDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEnrollmentTypeDetail.fulfilled, (state, action: PayloadAction<EnrollmentTypeDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchEnrollmentTypeDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: enrollmentTypeDetailActions } = enrollmentTypeDetailSlice;
export const { reducer: enrollmentTypeDetailReducer } = enrollmentTypeDetailSlice;
