import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEduCourses } from 'entities/EduCourses';

export const deleteEduCourse = createAsyncThunk<void, string, ThunkConfig<string>>(
    'eduCourses/deleteEduCourse',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/educations-courses/${id}`);

            dispatch(fetchEduCourses());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
