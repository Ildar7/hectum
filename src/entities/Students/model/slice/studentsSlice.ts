import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentsType, StudentsSchema } from '../types/students';
import { fetchStudents } from '../services/fetchStudents/fetchStudents';

const initialState: StudentsSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<StudentsType[]>) => {
                state.isLoading = false;
                state.data = [...action.payload.map((student) => ({
                    ...student,
                    fio: `${student.user.first_name} ${student.user.last_name} ${student.user.patronymic}`,
                }))];
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studentsActions } = studentsSlice;
export const { reducer: studentsReducer } = studentsSlice;
