import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitizenshipDetailType } from 'entities/CitizenshipDetail';
import { EditCitizenshipSchema } from '../types/editCitizenship';
import { editCitizenship } from '../services/editCitizenship/editCitizenship';

const initialState: EditCitizenshipSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editCitizenshipSlice = createSlice({
    name: 'editCitizenship',
    initialState,
    reducers: {
        setCitizenshipData: (state, action: PayloadAction<CitizenshipDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    name: state.data.citizenship,
                    country_id: +state.data.country_id,
                };
            }
        },
        setName: (state, action: PayloadAction<string>) => {
            state.newFields!.name = action.payload;
        },
        setCountryId: (state, action: PayloadAction<string>) => {
            state.newFields!.country_id = +action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                name: state.data?.citizenship || null,
                country_id: state.data?.country_id || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editCitizenship.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editCitizenship.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editCitizenship.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editCitizenshipActions } = editCitizenshipSlice;
export const { reducer: editCitizenshipReducer } = editCitizenshipSlice;
