import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchStudyDurationDetail,
} from '../services/fetchStudyDurationDetail/fetchStudyDurationDetail';
import {
    StudyDurationDetailSchema,
    StudyDurationDetailType,
} from '../types/studyDurationDetail';

const initialState: StudyDurationDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const studyDurationDetailSlice = createSlice({
    name: 'studyDurationDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudyDurationDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudyDurationDetail.fulfilled, (state, action: PayloadAction<StudyDurationDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchStudyDurationDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studyDurationDetailActions } = studyDurationDetailSlice;
export const { reducer: studyDurationDetailReducer } = studyDurationDetailSlice;
