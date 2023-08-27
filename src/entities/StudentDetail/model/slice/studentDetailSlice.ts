import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchStudentDetail } from '../services/fetchStudentDetail/fetchStudentDetail';
import { StudentDetailSchema, StudentDetailType } from '../types/studentDetail';

const initialState: StudentDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const studentDetailSlice = createSlice({
    name: 'studentDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudentDetail.fulfilled, (state, action: PayloadAction<StudentDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchStudentDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studentDetailActions } = studentDetailSlice;
export const { reducer: studentDetailReducer } = studentDetailSlice;
