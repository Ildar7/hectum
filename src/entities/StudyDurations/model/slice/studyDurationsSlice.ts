import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyDurationsSchema } from 'entities/StudyDurations';
import { StudyDurationsData } from 'entities/StudyDurations/model/types/studyDurations';
import { fetchStudyDurations } from '../services/fetchStudyDurations/fetchStudyDurations';

const initialState: StudyDurationsSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const studyDurationsSlice = createSlice({
    name: 'studyDurations',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<string>) => {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudyDurations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudyDurations.fulfilled, (state, action: PayloadAction<StudyDurationsData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchStudyDurations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studyDurationsActions } = studyDurationsSlice;
export const { reducer: studyDurationsReducer } = studyDurationsSlice;
