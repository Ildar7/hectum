import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { StudentsType } from '../../types/students';

export const fetchStudents = createAsyncThunk<StudentsType[], void, ThunkConfig<string>>(
    'students/fetchStudents',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.get<StudentsType[]>('/college/students/');

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
