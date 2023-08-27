import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchStudents } from 'entities/Students';
import { clearObject } from 'shared/lib/clearObject/clearObject';
import { fetchStudentDetail } from 'entities/StudentDetail/model/services/fetchStudentDetail/fetchStudentDetail';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { formatPhoneNumber } from 'shared/lib/formatPhoneNumber/formatPhoneNumber';
import { getEditStudentData } from '../../selectors/getEditStudentData/getEditStudentData';
import { getEditStudentNewFieldsData } from '../../selectors/getEditStudentNewFieldsData/getEditStudentNewFieldsData';
import { EditStudentErrors, NewFieldsType } from '../../types/editStudent';

export const editStudent = createAsyncThunk<void, string, ThunkConfig<EditStudentErrors>>(
    'students/editStudent',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const studentInitialData = getEditStudentData(getState() as any);
        const studentNewData = getEditStudentNewFieldsData(getState() as any);

        const data: NewFieldsType = clearObject(studentInitialData, studentNewData);

        const birthDateFormat = data?.birth_date ? data?.birth_date.split('.') : '';
        const arrivalDateFormat = data?.arrival_date ? data?.arrival_date.split('.') : '';
        const govidIssueDate = data?.govid_issue_date ? data?.govid_issue_date.split('.') : '';

        if (data.birth_date) {
            data.birth_date = formatDate(birthDateFormat);
        }

        if (data.arrival_date) {
            data.arrival_date = formatDate(arrivalDateFormat);
        }

        if (data.govid_issue_date) {
            data.govid_issue_date = formatDate(govidIssueDate);
        }

        if (data.phone_number) {
            data.phone_number = formatPhoneNumber(data.phone_number);
        }

        try {
            const response = await extra.api.put<void>(`/college/students/${id}`, data);

            dispatch(fetchStudents());
            dispatch(fetchStudentDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
