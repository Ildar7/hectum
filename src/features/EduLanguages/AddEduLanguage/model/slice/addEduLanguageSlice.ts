import { createSlice } from '@reduxjs/toolkit';
import { AddEduLanguageSchema } from '../types/addEduLanguage';
import {
    addEduLanguage,
} from '../services/addEduLanguage/addEduLanguage';

const initialState: AddEduLanguageSchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addEduLanguageSlice = createSlice({
    name: 'addEduLanguage',
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
            .addCase(addEduLanguage.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addEduLanguage.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addEduLanguage.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addEduLanguageActions } = addEduLanguageSlice;
export const { reducer: addEduLanguageReducer } = addEduLanguageSlice;
