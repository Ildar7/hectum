import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { EduLanguagesData, EduLanguagesError } from 'entities/EduLanguages/model/types/eduLanguages';
import { getEduLanguagesPage } from '../../selectors/getEduLanguagesPage/getEduLanguagesPage';
import { getEduLanguagesLimit } from '../../selectors/getEduLanguagesLimit/getEduLanguagesLimit';

export const fetchEduLanguages = createAsyncThunk<EduLanguagesData, void, ThunkConfig<EduLanguagesError>>(
    'students/fetchEduLanguages',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getEduLanguagesPage(getState() as StateSchema);
        const limit = getEduLanguagesLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/study-languages?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<EduLanguagesData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
