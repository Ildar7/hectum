import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QualificationsSchema } from 'entities/Qualifications';
import { QualificationsData } from 'entities/Qualifications/model/types/qualifications';
import { fetchQualifications } from '../services/fetchQualifications/fetchQualifications';

const initialState: QualificationsSchema = {
    data: undefined,
    isLoading: true,
    error: undefined,
    page: '1',
    limit: '50',
};

const qualificationsSlice = createSlice({
    name: 'qualifications',
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
            .addCase(fetchQualifications.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchQualifications.fulfilled, (state, action: PayloadAction<QualificationsData>) => {
                state.isLoading = false;
                state.data = {
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(fetchQualifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: qualificationsActions } = qualificationsSlice;
export const { reducer: qualificationsReducer } = qualificationsSlice;
