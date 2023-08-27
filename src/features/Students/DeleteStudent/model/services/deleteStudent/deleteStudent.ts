import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudents } from 'entities/Students';

export const deleteStudent = createAsyncThunk<void, string, ThunkConfig<string>>(
    'students/deleteStudent',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<void>(`/college/students/${id}`);

            dispatch(fetchStudents());

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
