import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditStudyDurationSchema } from 'features/StudyDurations/EditStudyDuration';
import { StudyDurationDetailType } from 'entities/StudyDurationDetail';
import {
    editStudyDuration,
} from '../services/editStudyDuration/editStudyDuration';

const initialState: EditStudyDurationSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editStudyDurationSlice = createSlice({
    name: 'editStudyDuration',
    initialState,
    reducers: {
        setStudyDurationData: (state, action: PayloadAction<StudyDurationDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.durationoftraining,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.durationoftraining || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editStudyDuration.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editStudyDuration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editStudyDuration.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editStudyDurationActions } = editStudyDurationSlice;
export const { reducer: editStudyDurationReducer } = editStudyDurationSlice;
