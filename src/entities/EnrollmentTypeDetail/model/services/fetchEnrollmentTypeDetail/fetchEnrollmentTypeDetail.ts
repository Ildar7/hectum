import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EnrollmentTypeDetailType } from 'entities/EnrollmentTypeDetail/model/types/enrollmentTypeDetail';
import { editEnrollmentTypeActions } from 'features/EnrollmentTypes/EditEnrollmentType';

export const fetchEnrollmentTypeDetail = createAsyncThunk<EnrollmentTypeDetailType, string, ThunkConfig<string>>(
    'enrollmentTypes/fetchEnrollmentTypeDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<EnrollmentTypeDetailType>(`/college/enrollment-types/${id}`);

            dispatch(editEnrollmentTypeActions.setEnrollmentTypeData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
