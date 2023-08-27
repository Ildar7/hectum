import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCitizenship } from '../services/addCitizenship/addCitizenship';
import { AddCitizenshipSchema } from '../types/addCitizenship';

const initialState: AddCitizenshipSchema = {
    data: {
        name: null,
        country_id: null,
    },
    isLoading: false,
    errors: undefined,
};

const addCitizenshipSlice = createSlice({
    name: 'addCitizenship',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.data.name = action.payload;
        },
        setCountryId: (state, action: PayloadAction<string>) => {
            state.data.country_id = +action.payload;
        },
        clearData: (state) => {
            state.data = {
                name: null,
                country_id: null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCitizenship.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addCitizenship.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addCitizenship.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addCitizenshipActions } = addCitizenshipSlice;
export const { reducer: addCitizenshipReducer } = addCitizenshipSlice;
