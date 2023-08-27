import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImportStudentsSchema, ImportStudentColumns, ImportStudentsImportedInfo } from '../types/importStudents';
import {
    fetchImportStudentsFields,
} from '../services/fetchImportStudentsFields/fetchImportStudentsFields';
import { importStudents } from '../services/importStudents/importStudents';

const initialState: ImportStudentsSchema = {
    isLoadingFetchFields: true,
    isLoading: false,
    matchingFields: {},
};

const importStudentsSlice = createSlice({
    name: 'importStudents',
    initialState,
    reducers: {
        initMatchingFields: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((itemKey) => {
                state.matchingFields![itemKey] = {
                    databaseField: 'null',
                    customCsvField: 'null',
                    databaseFieldValue: 'null',
                };
            });
        },
        setColumnsFromFile: (state, action: PayloadAction<string[]>) => {
            state.columnsFromFile = action.payload;
        },
        setMatchingFields: (state, action: PayloadAction<string[]>) => {
            if (action.payload[1] === 'databaseField') {
                // eslint-disable-next-line prefer-destructuring
                state.matchingFields![action.payload[0]][action.payload[1]] = action.payload[3];
                // eslint-disable-next-line prefer-destructuring
                state.matchingFields![action.payload[0]].databaseFieldValue = action.payload[2];
            } else {
                // @ts-ignore
                // eslint-disable-next-line prefer-destructuring
                state.matchingFields[action.payload[0]][action.payload[1]] = action.payload[2];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImportStudentsFields.pending, (state) => {
                state.errorFetchFields = undefined;
                state.isLoadingFetchFields = true;
            })
            .addCase(fetchImportStudentsFields.fulfilled, (state, action: PayloadAction<ImportStudentColumns>) => {
                state.isLoadingFetchFields = false;
                state.databaseFields = action.payload;
            })
            .addCase(fetchImportStudentsFields.rejected, (state, action) => {
                state.isLoadingFetchFields = false;
                state.errorFetchFields = action.payload;
            })
            .addCase(importStudents.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(importStudents.fulfilled, (state, action: PayloadAction<ImportStudentsImportedInfo>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(importStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: importStudentsActions } = importStudentsSlice;
export const { reducer: importStudentsReducer } = importStudentsSlice;
