import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ImportStudentsImportedInfo, ImportStudentsSendData } from '../../types/importStudents';

export const importStudents = createAsyncThunk<ImportStudentsImportedInfo, ImportStudentsSendData, ThunkConfig<string>>(
    'students/importStudents',
    async (dataToSend, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        const data = new FormData();

        data.append('columns', dataToSend.columns);
        data.append('file', dataToSend.file);

        try {
            const response = await extra.api.post<ImportStudentsImportedInfo>('/college/students/import/', data);

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ОШИБКА');
        }
    },
);
