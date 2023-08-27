import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditEduCourseSchema } from 'features/EduCourses/EditEduCourse';
import { EduCourseDetailType } from 'entities/EduCourseDetail';
import {
    editEduCourse,
} from '../services/editEduCourse/editEduCourse';

const initialState: EditEduCourseSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editEduCourseSlice = createSlice({
    name: 'editEduCourse',
    initialState,
    reducers: {
        setEduCourseData: (state, action: PayloadAction<EduCourseDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.courseoftraining,
                    value: state.data.coursevalue.toString(),
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        setValue: (state, action: PayloadAction<string>) => {
            state.newFields!.value = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.courseoftraining || null,
                value: state.data?.coursevalue.toString() || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editEduCourse.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editEduCourse.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editEduCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editEduCourseActions } = editEduCourseSlice;
export const { reducer: editEduCourseReducer } = editEduCourseSlice;
