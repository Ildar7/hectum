import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchImportStudentsFields = createAsyncThunk<any, void, ThunkConfig<string>>(
    'students/fetchImportStudentsFields',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.get<any>('/college/students/import/fields/');

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
