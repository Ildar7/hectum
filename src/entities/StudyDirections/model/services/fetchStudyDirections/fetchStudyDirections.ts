import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { StudyDirectionsData, StudyDirectionsError } from 'entities/StudyDirections/model/types/studyDirections';
import { getStudyDirectionsPage } from '../../selectors/getStudyDirectionsPage/getStudyDirectionsPage';
import { getStudyDirectionsLimit } from '../../selectors/getStudyDirectionsLimit/getStudyDirectionsLimit';

export const fetchStudyDirections = createAsyncThunk<StudyDirectionsData, void, ThunkConfig<StudyDirectionsError>>(
    'students/fetchStudyDirections',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getStudyDirectionsPage(getState() as StateSchema);
        const limit = getStudyDirectionsLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/study-directions?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<StudyDirectionsData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
