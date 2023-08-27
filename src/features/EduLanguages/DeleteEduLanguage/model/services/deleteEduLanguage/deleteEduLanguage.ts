import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEduLanguages } from 'entities/EduLanguages';

export const deleteEduLanguage = createAsyncThunk<void, string, ThunkConfig<string>>(
    'eduLanguages/deleteEduLanguage',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/study-languages/${id}`);

            dispatch(fetchEduLanguages());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
