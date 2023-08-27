import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchQualifications } from 'entities/Qualifications';

export const deleteQualification = createAsyncThunk<void, string, ThunkConfig<string>>(
    'qualifications/deleteQualification',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/qualifications/${id}`);

            dispatch(fetchQualifications());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
