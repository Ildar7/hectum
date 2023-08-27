import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEnrollmentTypes } from 'entities/EnrollmentTypes';

export const deleteEnrollmentType = createAsyncThunk<void, string, ThunkConfig<string>>(
    'enrollmentTypes/deleteEnrollmentType',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/enrollment-types/${id}`);

            dispatch(fetchEnrollmentTypes());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
