import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EduCourseDetailType } from 'entities/EduCourseDetail/model/types/eduCourseDetail';
import { editEduCourseActions } from 'features/EduCourses/EditEduCourse';

export const fetchEduCourseDetail = createAsyncThunk<EduCourseDetailType, string, ThunkConfig<string>>(
    'eduCourses/fetchEduCourseDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<EduCourseDetailType>(`/college/educations-courses/${id}`);

            dispatch(editEduCourseActions.setEduCourseData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
