import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditEnrollmentTypeSchema } from 'features/EnrollmentTypes/EditEnrollmentType';
import { EnrollmentTypeDetailType } from 'entities/EnrollmentTypeDetail';
import {
    editEnrollmentType,
} from '../services/editEnrollmentType/editEnrollmentType';

const initialState: EditEnrollmentTypeSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editEnrollmentTypeSlice = createSlice({
    name: 'editEnrollmentType',
    initialState,
    reducers: {
        setEnrollmentTypeData: (state, action: PayloadAction<EnrollmentTypeDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.typeenrollment,
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.typeenrollment || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editEnrollmentType.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editEnrollmentType.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editEnrollmentType.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editEnrollmentTypeActions } = editEnrollmentTypeSlice;
export const { reducer: editEnrollmentTypeReducer } = editEnrollmentTypeSlice;
