import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddStudyDurationErrors, AddStudyDurationType } from 'features/StudyDurations/AddStudyDuration';
import { fetchStudyDurations } from 'entities/StudyDurations/model/services/fetchStudyDurations/fetchStudyDurations';
import { getAddStudyDurationTitle } from '../../selectors/getAddStudyDurationTitle/getAddStudyDurationTitle';
import { addStudyDurationActions } from '../../slice/addStudyDurationSlice';

export const addStudyDuration = createAsyncThunk<AddStudyDurationType, void, ThunkConfig<AddStudyDurationErrors>>(
    'studyDurations/addStudyDuration',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addStudyDurationTitle = getAddStudyDurationTitle(getState() as any);

        const data = {
            duration: addStudyDurationTitle,
        };

        try {
            const response = await extra.api.post<AddStudyDurationType>('/college/study-durations/', data);

            dispatch(fetchStudyDurations());
            dispatch(addStudyDurationActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
