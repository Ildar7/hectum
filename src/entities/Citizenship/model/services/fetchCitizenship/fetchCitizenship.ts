import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { CitizenshipData, CitizenshipError } from 'entities/Citizenship/model/types/citizenship';
import { getCitizenshipPage } from '../../selectors/getCitizenshipPage/getCitizenshipPage';
import { getCitizenshipLimit } from '../../selectors/getCitizenshipLimit/getCitizenshipLimit';

export const fetchCitizenship = createAsyncThunk<CitizenshipData, void, ThunkConfig<CitizenshipError>>(
    'students/fetchCitizenship',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getCitizenshipPage(getState() as StateSchema);
        const limit = getCitizenshipLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/citizenship?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<CitizenshipData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
