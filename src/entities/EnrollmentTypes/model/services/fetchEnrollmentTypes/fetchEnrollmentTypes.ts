import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { EnrollmentTypesData, EnrollmentTypesError } from 'entities/EnrollmentTypes';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import {
    getEnrollmentTypesPage,
} from '../../selectors/getEnrollmentTypesPage/getEnrollmentTypesPage';
import {
    getEnrollmentTypesLimit,
} from '../../selectors/getEnrollmentTypesLimit/getEnrollmentTypesLimit';

export const fetchEnrollmentTypes = createAsyncThunk<EnrollmentTypesData, void, ThunkConfig<EnrollmentTypesError>>(
    'students/fetchEnrollmentTypes',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getEnrollmentTypesPage(getState() as StateSchema);
        const limit = getEnrollmentTypesLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/enrollment-types?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<EnrollmentTypesData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
