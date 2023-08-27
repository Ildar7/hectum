import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { FinishedEduTypesData, FinishedEduTypesError } from 'entities/FinishedEduTypes/model/types/finishedEduTypes';
import { getFinishedEduTypesPage } from '../../selectors/getFinishedEduTypesPage/getFinishedEduTypesPage';
import { getFinishedEduTypesLimit } from '../../selectors/getFinishedEduTypesLimit/getFinishedEduTypesLimit';

export const fetchFinishedEduTypes = createAsyncThunk<FinishedEduTypesData, void, ThunkConfig<FinishedEduTypesError>>(
    'students/fetchFinishedEduTypes',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getFinishedEduTypesPage(getState() as StateSchema);
        const limit = getFinishedEduTypesLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/finished-education-types?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<FinishedEduTypesData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
