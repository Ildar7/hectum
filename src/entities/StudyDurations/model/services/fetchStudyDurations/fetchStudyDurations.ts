import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { StudyDurationsData, StudyDurationsError } from 'entities/StudyDurations/model/types/studyDurations';
import { getStudyDurationsPage } from '../../selectors/getStudyDurationsPage/getStudyDurationsPage';
import { getStudyDurationsLimit } from '../../selectors/getStudyDurationsLimit/getStudyDurationsLimit';

export const fetchStudyDurations = createAsyncThunk<StudyDurationsData, void, ThunkConfig<StudyDurationsError>>(
    'students/fetchStudyDurations',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getStudyDurationsPage(getState() as StateSchema);
        const limit = getStudyDurationsLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/study-durations?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<StudyDurationsData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
