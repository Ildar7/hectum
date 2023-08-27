import { createSlice } from '@reduxjs/toolkit';
import { addNewStudent } from '../services/addNewStudent/addNewStudent';
import { addStudentInitial } from '../../const/addStudentInitial';
import { AddStudentSchema } from '../types/addStudent';

const initialState: AddStudentSchema = {
    data: addStudentInitial,
    isLoading: false,
    errors: undefined,
};

const addStudentSlice = createSlice({
    name: 'addStudent',
    initialState,
    reducers: {
        setInputData: (state, action) => {
            if (!action.payload[1]) {
                state.data = {
                    ...state.data,
                    [action.payload[0]]: null,
                };
            } else {
                state.data = {
                    ...state.data,
                    [action.payload[0]]: action.payload[1],
                };
            }
        },
        clearData: (state) => {
            state.data = addStudentInitial;
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewStudent.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addNewStudent.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addStudentActions } = addStudentSlice;
export const { reducer: addStudentReducer } = addStudentSlice;
