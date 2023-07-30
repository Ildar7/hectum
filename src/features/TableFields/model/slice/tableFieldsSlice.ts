import { createSlice } from '@reduxjs/toolkit';
import { TABLE_FIELDS_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { TableFieldsSchema } from '../types/tableFields';
import { tableCheckedFields } from '../../const/tableCheckedFields';

const initialState: TableFieldsSchema = {};

const tableFieldsSlice = createSlice({
    name: 'tableFields',
    initialState,
    reducers: {
        initFieldsData: (state) => {
            const fields = localStorage.getItem(TABLE_FIELDS_LOCALSTORAGE_KEY);
            if (fields) {
                state.data = JSON.parse(fields);
            } else {
                state.data = tableCheckedFields;
            }
        },
        setCheckedField: (state, action) => {
            // @ts-ignore
            state.data = {
                ...state.data,
                [action.payload[1]]: action.payload[0],
            };
        },
        saveCheckedFields: (state) => {
            localStorage.setItem(TABLE_FIELDS_LOCALSTORAGE_KEY, JSON.stringify(state.data));
        },
        clearCheckedFields: (state) => {
            state.data = tableCheckedFields;
            localStorage.setItem(TABLE_FIELDS_LOCALSTORAGE_KEY, JSON.stringify(tableCheckedFields));
        },
    },
});

export const { actions: tableFieldsActions } = tableFieldsSlice;
export const { reducer: tableFieldsReducer } = tableFieldsSlice;
