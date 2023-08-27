import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudyDurations } from 'entities/StudyDurations';
import {
    fetchStudyDurationDetail,
} from 'entities/StudyDurationDetail/model/services/fetchStudyDurationDetail/fetchStudyDurationDetail';
import { EditStudyDurationErrors } from '../../types/editStudyDuration';
import {
    getEditStudyDurationNewFieldsData,
} from '../../selectors/getEditStudyDurationNewFieldsData/getEditStudyDurationNewFieldsData';

export const editStudyDuration = createAsyncThunk<void, string, ThunkConfig<EditStudyDurationErrors>>(
    'studyDurations/editStudyDuration',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const studyDurationNewData = getEditStudyDurationNewFieldsData(getState() as any);

        const data = {
            duration: studyDurationNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/study-durations/${id}`, data);

            dispatch(fetchStudyDurations());
            dispatch(fetchStudyDurationDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
