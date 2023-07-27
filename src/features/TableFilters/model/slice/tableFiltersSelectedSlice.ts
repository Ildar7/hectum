import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableFiltersSelectedSchema } from '../types/tableFiltersSelected';

const initialState: TableFiltersSelectedSchema = {
    data: {
        gender: 'null',
        nationality: 'null',
        speciality: 'null',
        qualifications: 'null',
        studyDurations: ['null'],
        educationsCourses: ['null'],
        educationsForms: 'null',
        enrollmentTypes: 'null',
        studentArrivalSources: 'null',
        finishedEducationTypes: 'null',
        studyLanguages: 'null',
        residenceTypes: 'null',
        needHostelTypes: ['null'],
        financingSources: ['null'],
        admissionQuotasTypes: ['null'],
        materialAssistanceTypes: ['null'],
    },
};

const tableFiltersSelectedSlice = createSlice({
    name: 'tableFiltersSelected',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string[]>) => {
            if (
                action.payload[0] === 'studyDurations'
                || action.payload[0] === 'educationsCourses'
                || action.payload[0] === 'needHostelTypes'
                || action.payload[0] === 'financingSources'
                || action.payload[0] === 'admissionQuotasTypes'
                || action.payload[0] === 'materialAssistanceTypes'
            ) {
                state.data = {
                    ...state.data,
                    [action.payload[0]]: [action.payload[1]],
                };
            } else {
                state.data = {
                    ...state.data,
                    [action.payload[0]]: action.payload[1],
                };
            }
        },
    },
});

export const { actions: tableFiltersSelectedActions } = tableFiltersSelectedSlice;
export const { reducer: tableFiltersSelectedReducer } = tableFiltersSelectedSlice;
