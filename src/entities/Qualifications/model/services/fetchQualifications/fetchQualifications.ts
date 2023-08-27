import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { QualificationsData, QualificationsError } from 'entities/Qualifications/model/types/qualifications';
import { getQualificationsPage } from '../../selectors/getQualificationsPage/getQualificationsPage';
import { getQualificationsLimit } from '../../selectors/getQualificationsLimit/getQualificationsLimit';

export const fetchQualifications = createAsyncThunk<QualificationsData, void, ThunkConfig<QualificationsError>>(
    'students/fetchQualifications',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getQualificationsPage(getState() as StateSchema);
        const limit = getQualificationsLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/qualifications?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<QualificationsData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
