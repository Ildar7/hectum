import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchEduCourseDetail,
} from '../services/fetchEduCourseDetail/fetchEduCourseDetail';
import {
    EduCourseDetailSchema,
    EduCourseDetailType,
} from '../types/eduCourseDetail';

const initialState: EduCourseDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const eduCourseDetailSlice = createSlice({
    name: 'eduCourseDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEduCourseDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEduCourseDetail.fulfilled, (state, action: PayloadAction<EduCourseDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchEduCourseDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: eduCourseDetailActions } = eduCourseDetailSlice;
export const { reducer: eduCourseDetailReducer } = eduCourseDetailSlice;
