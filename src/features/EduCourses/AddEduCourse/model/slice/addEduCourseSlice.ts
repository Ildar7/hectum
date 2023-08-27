import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddEduCourseSchema } from '../types/addEduCourse';
import {
    addEduCourse,
} from '../services/addEduCourse/addEduCourse';

const initialState: AddEduCourseSchema = {
    data: {
        title: null,
        value: null,
    },
    isLoading: false,
    errors: undefined,
};

const addEduCourseSlice = createSlice({
    name: 'addEduCourse',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.data.title = action.payload;
        },
        setValue: (state, action: PayloadAction<string>) => {
            state.data.value = action.payload;
        },
        clearData: (state) => {
            state.data = {
                title: null,
                value: null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEduCourse.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addEduCourse.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addEduCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addEduCourseActions } = addEduCourseSlice;
export const { reducer: addEduCourseReducer } = addEduCourseSlice;
