import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableFiltersSelectedSchema } from '../types/tableFiltersSelected';
import { tableSelectedFilters } from '../../const/tableSelectedFilters';

const initialState: TableFiltersSelectedSchema = {
    data: tableSelectedFilters,
};

const tableFiltersSelectedSlice = createSlice({
    name: 'tableFiltersSelected',
    initialState,
    reducers: {
        setBirthDateFilter: (state, action: PayloadAction<any[]>) => {
            if (action.payload[2] === 'from') {
                state.data = {
                    ...state.data,
                    [action.payload[1]]: {
                        // @ts-ignore
                        ...state.data[action.payload[1]],
                        from: action.payload[0],
                    },
                };
            } else {
                state.data = {
                    ...state.data,
                    [action.payload[1]]: {
                        // @ts-ignore
                        ...state.data[action.payload[1]],
                        to: action.payload[0],
                    },
                };
            }
        },
        setSelectFilter: (state, action: PayloadAction<string[]>) => {
            state.data = {
                ...state.data,
                [action.payload[0]]: action.payload[1],
            };
        },
        setSelectMultipleFilter: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload[0]]: action.payload[1],
            };
        },
        setInputFilter: (state, action: PayloadAction<string[]>) => {
            state.data = {
                ...state.data,
                [action.payload[0]]: action.payload[1],
            };
        },
        setCheckboxFilter: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload[1]]: action.payload[0],
            };
        },
        clearFilters: (state) => {
            state.data = tableSelectedFilters;
        },
    },
});

export const { actions: tableFiltersSelectedActions } = tableFiltersSelectedSlice;
export const { reducer: tableFiltersSelectedReducer } = tableFiltersSelectedSlice;
