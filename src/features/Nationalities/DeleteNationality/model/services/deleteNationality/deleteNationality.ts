import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchNationalities } from 'entities/Nationalities';

export const deleteNationality = createAsyncThunk<void, string, ThunkConfig<string>>(
    'nationalities/deleteNationality',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/nationalities/${id}`);

            dispatch(fetchNationalities());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
