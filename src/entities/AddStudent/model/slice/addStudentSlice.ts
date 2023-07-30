import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addStudentInitial } from '../../const/addStudentInitial';
import { AddStudentSchema } from '../types/addStudent';

const initialState: AddStudentSchema = {
    data: addStudentInitial,
};

const addStudentSlice = createSlice({
    name: 'addStudent',
    initialState,
    reducers: {
        setInputData: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload[0]]: action.payload[1],
            };
        },
        clearData: (state) => {
            state.data = addStudentInitial;
        },
    },
});

export const { actions: addStudentActions } = addStudentSlice;
export const { reducer: addStudentReducer } = addStudentSlice;
