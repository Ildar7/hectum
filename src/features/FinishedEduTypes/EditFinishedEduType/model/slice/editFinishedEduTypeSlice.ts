import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditFinishedEduTypeSchema } from 'features/FinishedEduTypes/EditFinishedEduType';
import { FinishedEduTypeDetailType } from 'entities/FinishedEduTypeDetail';
import {
    editFinishedEduType,
} from '../services/editFinishedEduType/editFinishedEduType';

const initialState: EditFinishedEduTypeSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editFinishedEduTypeSlice = createSlice({
    name: 'editFinishedEduType',
    initialState,
    reducers: {
        setFinishedEduTypeData: (state, action: PayloadAction<FinishedEduTypeDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.fromacceptedfinished,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.fromacceptedfinished || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editFinishedEduType.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editFinishedEduType.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editFinishedEduType.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editFinishedEduTypeActions } = editFinishedEduTypeSlice;
export const { reducer: editFinishedEduTypeReducer } = editFinishedEduTypeSlice;
