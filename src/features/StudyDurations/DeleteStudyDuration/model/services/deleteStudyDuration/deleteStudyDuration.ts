import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudyDurations } from 'entities/StudyDurations';

export const deleteStudyDuration = createAsyncThunk<void, string, ThunkConfig<string>>(
    'studyDurations/deleteStudyDuration',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/study-durations/${id}`);

            dispatch(fetchStudyDurations());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
