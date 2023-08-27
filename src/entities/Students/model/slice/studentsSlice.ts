import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentsData, StudentsSchema } from '../types/students';
import { fetchStudents } from '../services/fetchStudents/fetchStudents';

const initialState: StudentsSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const studentsSlice = createSlice({
    name: 'students',
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
            .addCase(fetchStudents.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<StudentsData>) => {
                state.isLoading = false;
                state.data = {
                    data: [...action.payload.data.map((student) => ({
                        ...student,
                        fio: `
                        ${student.user.last_name ? student.user.last_name : ''} 
                        ${student.user.first_name} 
                        ${student.user.patronymic ? student.user.patronymic : ''}
                    `,
                    }))],
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studentsActions } = studentsSlice;
export const { reducer: studentsReducer } = studentsSlice;
