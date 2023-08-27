import { createSlice } from '@reduxjs/toolkit';
import { AddFinishedEduTypeSchema } from '../types/addFinishedEduType';
import {
    addFinishedEduType,
} from '../services/addFinishedEduType/addFinishedEduType';

const initialState: AddFinishedEduTypeSchema = {
    data: {
        title: null,
    },
    isLoading: false,
    errors: undefined,
};

const addFinishedEduTypeSlice = createSlice({
    name: 'addFinishedEduType',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.data.title = action.payload;
        },
        clearData: (state) => {
            state.data = {
                title: null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFinishedEduType.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(addFinishedEduType.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addFinishedEduType.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: addFinishedEduTypeActions } = addFinishedEduTypeSlice;
export const { reducer: addFinishedEduTypeReducer } = addFinishedEduTypeSlice;
