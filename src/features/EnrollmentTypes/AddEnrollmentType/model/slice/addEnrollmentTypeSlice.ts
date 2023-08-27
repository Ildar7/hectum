import { createSlice } from '@reduxjs/toolkit';
import { AddEnrollmentTypeSchema } from '../types/addEnrollmentType';
import {
    addEnrollmentType,
} from '../services/addEnrollmentType/addEnrollmentType';

const initialState: AddEnrollmentTypeSchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addEnrollmentTypeSlice = createSlice({
    name: 'addEnrollmentType',
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
            .addCase(addEnrollmentType.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addEnrollmentType.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addEnrollmentType.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addEnrollmentTypeActions } = addEnrollmentTypeSlice;
export const { reducer: addEnrollmentTypeReducer } = addEnrollmentTypeSlice;
