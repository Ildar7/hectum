import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchStudyDirectionDetail,
} from '../services/fetchStudyDirectionDetail/fetchStudyDirectionDetail';
import {
    StudyDirectionDetailSchema,
    StudyDirectionDetailType,
} from '../types/studyDirectionDetail';

const initialState: StudyDirectionDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const studyDirectionDetailSlice = createSlice({
    name: 'studyDirectionDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudyDirectionDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudyDirectionDetail.fulfilled, (state, action: PayloadAction<StudyDirectionDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchStudyDirectionDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studyDirectionDetailActions } = studyDirectionDetailSlice;
export const { reducer: studyDirectionDetailReducer } = studyDirectionDetailSlice;
