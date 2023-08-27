import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from 'app/providers/StoreProvider';
import { getTableSortField, getTableSortOrderField } from 'features/TableSort';
import { EduCoursesData, EduCoursesError } from 'entities/EduCourses/model/types/eduCourses';
import { getEduCoursesPage } from '../../selectors/getEduCoursesPage/getEduCoursesPage';
import { getEduCoursesLimit } from '../../selectors/getEduCoursesLimit/getEduCoursesLimit';

export const fetchEduCourses = createAsyncThunk<EduCoursesData, void, ThunkConfig<EduCoursesError>>(
    'students/fetchEduCourses',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const selectedSortField = getTableSortField(getState() as StateSchema);
        const selectedSortOrderField = getTableSortOrderField(getState() as StateSchema);

        const page = getEduCoursesPage(getState() as StateSchema);
        const limit = getEduCoursesLimit(getState() as StateSchema);

        const selectedSort = {
            sort: selectedSortField!,
            order: selectedSortOrderField!,
        };

        const sort = new URLSearchParams(selectedSort).toString();

        const requestUrl = `/college/educations-courses?page=${page}&limit=${limit}&${sort}`;

        try {
            const response = await extra.api.get<EduCoursesData>(requestUrl);

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.response.status,
                error: err.response.data.message,
            });
        }
    },
);
