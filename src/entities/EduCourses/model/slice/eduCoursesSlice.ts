import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EduCoursesSchema } from 'entities/EduCourses';
import { EduCoursesData } from 'entities/EduCourses/model/types/eduCourses';
import { fetchEduCourses } from '../services/fetchEduCourses/fetchEduCourses';

const initialState: EduCoursesSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const eduCoursesSlice = createSlice({
    name: 'eduCourses',
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
            .addCase(fetchEduCourses.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEduCourses.fulfilled, (state, action: PayloadAction<EduCoursesData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchEduCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: eduCoursesActions } = eduCoursesSlice;
export const { reducer: eduCoursesReducer } = eduCoursesSlice;
