import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEnrollmentTypes } from '../services/fetchEnrollmentTypes/fetchEnrollmentTypes';
import { EnrollmentTypesData, EnrollmentTypesSchema } from '../types/enrollmentTypes';

const initialState: EnrollmentTypesSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const enrollmentTypesSlice = createSlice({
    name: 'enrollmentTypes',
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
            .addCase(fetchEnrollmentTypes.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEnrollmentTypes.fulfilled, (state, action: PayloadAction<EnrollmentTypesData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchEnrollmentTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: enrollmentTypesActions } = enrollmentTypesSlice;
export const { reducer: enrollmentTypesReducer } = enrollmentTypesSlice;
