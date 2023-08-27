import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchFinishedEduTypes } from 'entities/FinishedEduTypes';

export const deleteFinishedEduType = createAsyncThunk<void, string, ThunkConfig<string>>(
    'finishedEduTypes/deleteFinishedEduType',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/finished-education-types/${id}`);

            dispatch(fetchFinishedEduTypes());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
