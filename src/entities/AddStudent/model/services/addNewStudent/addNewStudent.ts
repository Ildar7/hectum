import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAddStudentData } from 'entities/AddStudent/model/selectors/getAddStudentData/getAddStudentData';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { fetchStudents } from 'entities/Students/model/services/fetchStudents/fetchStudents';
import { formatPhoneNumber } from 'shared/lib/formatPhoneNumber/formatPhoneNumber';
import { AddStudentType } from '../../types/AddStudent';

export const addNewStudent = createAsyncThunk<AddStudentType, void, ThunkConfig<string>>(
    'students/addNewStudent',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addNewStudentData = getAddStudentData(getState() as any);

        const birthDateFormat = addNewStudentData?.birth_date ? addNewStudentData?.birth_date.split('.') : '';
        const arrivalDateFormat = addNewStudentData?.arrival_date ? addNewStudentData?.arrival_date.split('.') : '';
        const govidIssueDate = addNewStudentData?.govid_issue_date ? addNewStudentData?.govid_issue_date.split('.') : '';

        const data = {
            ...addNewStudentData,
            birth_date: formatDate(birthDateFormat),
            arrival_date: formatDate(arrivalDateFormat),
            govid_issue_date: formatDate(govidIssueDate),
            phone_number: formatPhoneNumber(addNewStudentData?.phone_number),
        };

        try {
            const response = await extra.api.post<AddStudentType>('/college/students/', data);

            if (response.status === 201) {
                dispatch(fetchStudents());
            }

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
