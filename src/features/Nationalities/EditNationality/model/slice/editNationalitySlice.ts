import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditNationalitySchema } from 'features/Nationalities/EditNationality';
import { NationalityDetailType } from 'entities/NationalityDetail';
import {
    editNationality,
} from '../services/editNationality/editNationality';

const initialState: EditNationalitySchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editNationalitySlice = createSlice({
    name: 'editNationality',
    initialState,
    reducers: {
        setNationalityData: (state, action: PayloadAction<NationalityDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.nationality,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.nationality || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editNationality.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editNationality.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editNationality.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editNationalityActions } = editNationalitySlice;
export const { reducer: editNationalityReducer } = editNationalitySlice;
