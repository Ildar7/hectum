import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditEduLanguageSchema } from 'features/EduLanguages/EditEduLanguage';
import { EduLanguageDetailType } from 'entities/EduLanguageDetail';
import {
    editEduLanguage,
} from '../services/editEduLanguage/editEduLanguage';

const initialState: EditEduLanguageSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editEduLanguageSlice = createSlice({
    name: 'editEduLanguage',
    initialState,
    reducers: {
        setEduLanguageData: (state, action: PayloadAction<EduLanguageDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.languageofedu,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.languageofedu || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editEduLanguage.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editEduLanguage.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editEduLanguage.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editEduLanguageActions } = editEduLanguageSlice;
export const { reducer: editEduLanguageReducer } = editEduLanguageSlice;
