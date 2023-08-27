import { createSlice } from '@reduxjs/toolkit';
import { AddNationalitySchema } from '../types/addNationality';
import {
    addNationality,
} from '../services/addNationality/addNationality';

const initialState: AddNationalitySchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addNationalitySlice = createSlice({
    name: 'addNationality',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.data.title = action.payload;
        },
        clearData: (state) => {
            state.data = {
                title: null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNationality.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addNationality.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNationality.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addNationalityActions } = addNationalitySlice;
export const { reducer: addNationalityReducer } = addNationalitySlice;
