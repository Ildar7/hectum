import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudyDirections } from 'entities/StudyDirections';

export const deleteStudyDirection = createAsyncThunk<void, string, ThunkConfig<string>>(
    'studyDirections/deleteStudyDirection',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/study-directions/${id}`);

            dispatch(fetchStudyDirections());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
