import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyDirectionsSchema } from 'entities/StudyDirections';
import { StudyDirectionsData } from 'entities/StudyDirections/model/types/studyDirections';
import { fetchStudyDirections } from '../services/fetchStudyDirections/fetchStudyDirections';

const initialState: StudyDirectionsSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const studyDirectionsSlice = createSlice({
    name: 'studyDirections',
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
            .addCase(fetchStudyDirections.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStudyDirections.fulfilled, (state, action: PayloadAction<StudyDirectionsData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchStudyDirections.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: studyDirectionsActions } = studyDirectionsSlice;
export const { reducer: studyDirectionsReducer } = studyDirectionsSlice;
