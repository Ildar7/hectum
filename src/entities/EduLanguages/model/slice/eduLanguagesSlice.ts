import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EduLanguagesSchema } from 'entities/EduLanguages';
import { EduLanguagesData } from 'entities/EduLanguages/model/types/eduLanguages';
import { fetchEduLanguages } from '../services/fetchEduLanguages/fetchEduLanguages';

const initialState: EduLanguagesSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const eduLanguagesSlice = createSlice({
    name: 'eduLanguages',
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
            .addCase(fetchEduLanguages.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEduLanguages.fulfilled, (state, action: PayloadAction<EduLanguagesData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchEduLanguages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: eduLanguagesActions } = eduLanguagesSlice;
export const { reducer: eduLanguagesReducer } = eduLanguagesSlice;
