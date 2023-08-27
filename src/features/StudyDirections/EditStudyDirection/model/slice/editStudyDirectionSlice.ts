import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditStudyDirectionSchema } from 'features/StudyDirections/EditStudyDirection';
import { StudyDirectionDetailType } from 'entities/StudyDirectionDetail';
import {
    editStudyDirection,
} from '../services/editStudyDirection/editStudyDirection';

const initialState: EditStudyDirectionSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editStudyDirectionSlice = createSlice({
    name: 'editStudyDirection',
    initialState,
    reducers: {
        setStudyDirectionData: (state, action: PayloadAction<StudyDirectionDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.typeofdirection,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.typeofdirection || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editStudyDirection.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editStudyDirection.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editStudyDirection.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editStudyDirectionActions } = editStudyDirectionSlice;
export const { reducer: editStudyDirectionReducer } = editStudyDirectionSlice;
