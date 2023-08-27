import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitizenshipDetailSchema, CitizenshipDetailType } from '../types/citizenshipDetail';
import { fetchCitizenshipDetail } from '../services/fetchCitizenshipDetail/fetchCitizenshipDetail';

const initialState: CitizenshipDetailSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const citizenshipDetailSlice = createSlice({
    name: 'citizenshipDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitizenshipDetail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCitizenshipDetail.fulfilled, (state, action: PayloadAction<CitizenshipDetailType>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCitizenshipDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: citizenshipDetailActions } = citizenshipDetailSlice;
export const { reducer: citizenshipDetailReducer } = citizenshipDetailSlice;
