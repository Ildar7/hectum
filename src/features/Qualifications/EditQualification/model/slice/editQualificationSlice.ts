import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditQualificationSchema } from 'features/Qualifications/EditQualification';
import { QualificationDetailType } from 'entities/QualificationDetail';
import {
    editQualification,
} from '../services/editQualification/editQualification';

const initialState: EditQualificationSchema = {
    data: undefined,
    newFields: undefined,
    isLoading: false,
    errors: undefined,
};

const editQualificationSlice = createSlice({
    name: 'editQualification',
    initialState,
    reducers: {
        setQualificationData: (state, action: PayloadAction<QualificationDetailType | undefined>) => {
            if (action.payload) {
                state.data = action.payload;
                state.newFields = {
                    title: state.data.qualification,
                    code: state.data.shifr_qual,
                    speciality_id: state.data.specialty_id.toString(),
                };
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.newFields!.title = action.payload;
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.newFields!.code = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.newFields!.speciality_id = action.payload;
        },
        clearNewFields: (state) => {
            state.newFields = {
                title: state.data?.qualification || null,
                code: state.data?.shifr_qual || null,
                speciality_id: state.data?.specialty_id.toString() || null,
            };
            state.errors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editQualification.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(editQualification.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editQualification.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { actions: editQualificationActions } = editQualificationSlice;
export const { reducer: editQualificationReducer } = editQualificationSlice;
