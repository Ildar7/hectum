import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddEduCourseErrors, AddEduCourseType } from 'features/EduCourses/AddEduCourse';
import { fetchEduCourses } from 'entities/EduCourses/model/services/fetchEduCourses/fetchEduCourses';
import {
    getAddEduCourseValue,
} from 'features/EduCourses/AddEduCourse/model/selectors/getAddEduCourseValue/getAddEduCourseValue';
import { getAddEduCourseTitle } from '../../selectors/getAddEduCourseTitle/getAddEduCourseTitle';
import { addEduCourseActions } from '../../slice/addEduCourseSlice';

export const addEduCourse = createAsyncThunk<AddEduCourseType, void, ThunkConfig<AddEduCourseErrors>>(
    'eduCourses/addEduCourse',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addEduCourseTitle = getAddEduCourseTitle(getState() as any);
        const addEduCourseValue = getAddEduCourseValue(getState() as any);

        const data = {
            title: addEduCourseTitle,
            value: addEduCourseValue,
        };

        try {
            const response = await extra.api.post<AddEduCourseType>('/college/educations-courses/', data);

            dispatch(fetchEduCourses());
            dispatch(addEduCourseActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
