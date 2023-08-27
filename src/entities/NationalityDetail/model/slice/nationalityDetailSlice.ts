import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchNationalityDetail,
} from '../services/fetchNationalityDetail/fetchNationalityDetail';
import {
    NationalityDetailSchema,
    NationalityDetailType,
} from '../types/nationalityDetail';

const initialState: NationalityDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const nationalityDetailSlice = createSlice({
    name: 'nationalityDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNationalityDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNationalityDetail.fulfilled, (state, action: PayloadAction<NationalityDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchNationalityDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: nationalityDetailActions } = nationalityDetailSlice;
export const { reducer: nationalityDetailReducer } = nationalityDetailSlice;
