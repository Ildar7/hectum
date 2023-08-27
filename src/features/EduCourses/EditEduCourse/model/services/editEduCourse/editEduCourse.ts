import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEduCourses } from 'entities/EduCourses';
import {
    fetchEduCourseDetail,
} from 'entities/EduCourseDetail/model/services/fetchEduCourseDetail/fetchEduCourseDetail';
import { EditEduCourseErrors } from '../../types/editEduCourse';
import {
    getEditEduCourseNewFieldsData,
} from '../../selectors/getEditEduCourseNewFieldsData/getEditEduCourseNewFieldsData';

export const editEduCourse = createAsyncThunk<void, string, ThunkConfig<EditEduCourseErrors>>(
    'eduCourses/editEduCourse',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const eduCourseNewData = getEditEduCourseNewFieldsData(getState() as any);

        const data = {
            title: eduCourseNewData?.title,
            value: eduCourseNewData?.value,
        };

        try {
            const response = await extra.api.put<void>(`/college/educations-courses/${id}`, data);

            dispatch(fetchEduCourses());
            dispatch(fetchEduCourseDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
