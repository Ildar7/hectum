import { createSlice } from '@reduxjs/toolkit';
import { AddStudyDirectionSchema } from '../types/addStudyDirection';
import {
    addStudyDirection,
} from '../services/addStudyDirection/addStudyDirection';

const initialState: AddStudyDirectionSchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addStudyDirectionSlice = createSlice({
    name: 'addStudyDirection',
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
            .addCase(addStudyDirection.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addStudyDirection.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addStudyDirection.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addStudyDirectionActions } = addStudyDirectionSlice;
export const { reducer: addStudyDirectionReducer } = addStudyDirectionSlice;
