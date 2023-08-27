import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { NationalitiesData, NationalitiesError } from 'entities/Nationalities/model/types/nationalities';
import { getNationalitiesPage } from '../../selectors/getNationalitiesPage/getNationalitiesPage';
import { getNationalitiesLimit } from '../../selectors/getNationalitiesLimit/getNationalitiesLimit';

export const fetchNationalities = createAsyncThunk<NationalitiesData, void, ThunkConfig<NationalitiesError>>(
    'students/fetchNationalities',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getNationalitiesPage(getState() as StateSchema);
        const limit = getNationalitiesLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/nationalities?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<NationalitiesData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
