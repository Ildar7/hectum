import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { StudyDurationDetailType } from 'entities/StudyDurationDetail/model/types/studyDurationDetail';
import { editStudyDurationActions } from 'features/StudyDurations/EditStudyDuration';

export const fetchStudyDurationDetail = createAsyncThunk<StudyDurationDetailType, string, ThunkConfig<string>>(
    'studyDurations/fetchStudyDurationDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<StudyDurationDetailType>(`/college/study-durations/${id}`);

            dispatch(editStudyDurationActions.setStudyDurationData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
