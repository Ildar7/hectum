import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddQualificationSchema } from '../types/addQualification';
import {
    addQualification,
} from '../services/addQualification/addQualification';

const initialState: AddQualificationSchema = {
    data: {
        title: null,
        code: null,
        speciality_id: null,
    },
    isLoading: false,
    errors: undefined,
};

const addQualificationSlice = createSlice({
    name: 'addQualification',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.data.title = action.payload;
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.data.code = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.data.speciality_id = action.payload;
        },
        clearData: (state) => {
            state.data = {
                title: null,
                code: null,
                speciality_id: null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addQualification.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addQualification.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addQualification.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addQualificationActions } = addQualificationSlice;
export const { reducer: addQualificationReducer } = addQualificationSlice;
