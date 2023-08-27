import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableSortSchema } from 'features/TableSort';

const initialState: TableSortSchema = {
    sort: 'students_id',
    order: 'asc',
};

const tableSortSlice = createSlice({
    name: 'tableSort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<string>) => {
            if (state.sort === action.payload) {
                if (state.order === 'asc') {
                    state.order = 'desc';
                } else {
                    state.order = 'asc';
                }
            } else {
                state.order = 'asc';
            }

            state.sort = action.payload;
        },
    },
});

export const { actions: tableSortActions } = tableSortSlice;
export const { reducer: tableSortReducer } = tableSortSlice;
