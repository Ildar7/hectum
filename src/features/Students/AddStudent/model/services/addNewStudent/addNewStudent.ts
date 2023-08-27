import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { formatPhoneNumber } from 'shared/lib/formatPhoneNumber/formatPhoneNumber';
import { fetchStudents } from 'entities/Students';
import { addStudentActions } from '../../slice/addStudentSlice';
import { getAddStudentData } from '../../selectors/getAddStudentData/getAddStudentData';
import { AddStudentErrors, AddStudentType } from '../../types/addStudent';

export const addNewStudent = createAsyncThunk<AddStudentType, void, ThunkConfig<AddStudentErrors>>(
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
            phone_number: formatPhoneNumber(addNewStudentData?.phone_number || ''),
        };

        try {
            const response = await extra.api.post<AddStudentType>('/college/students/', data);

            dispatch(fetchStudents());
            dispatch(addStudentActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
