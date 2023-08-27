import { createSlice } from '@reduxjs/toolkit';
import { AddStudyDurationSchema } from '../types/addStudyDuration';
import {
    addStudyDuration,
} from '../services/addStudyDuration/addStudyDuration';

const initialState: AddStudyDurationSchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addStudyDurationSlice = createSlice({
    name: 'addStudyDuration',
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
            .addCase(addStudyDuration.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addStudyDuration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addStudyDuration.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addStudyDurationActions } = addStudyDurationSlice;
export const { reducer: addStudyDurationReducer } = addStudyDurationSlice;
