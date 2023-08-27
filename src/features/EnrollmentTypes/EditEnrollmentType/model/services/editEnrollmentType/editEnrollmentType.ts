import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchEnrollmentTypes } from 'entities/EnrollmentTypes';
import {
    fetchEnrollmentTypeDetail,
} from 'entities/EnrollmentTypeDetail/model/services/fetchEnrollmentTypeDetail/fetchEnrollmentTypeDetail';
import { EditEnrollmentTypeErrors } from '../../types/editEnrollmentType';
import {
    getEditEnrollmentTypeNewFieldsData,
} from '../../selectors/getEditEnrollmentTypeNewFieldsData/getEditEnrollmentTypeNewFieldsData';

export const editEnrollmentType = createAsyncThunk<void, string, ThunkConfig<EditEnrollmentTypeErrors>>(
    'enrollmentTypes/editEnrollmentType',
    async (id, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const enrollmentTypeNewData = getEditEnrollmentTypeNewFieldsData(getState() as any);

        const data = {
            title: enrollmentTypeNewData,
        };

        try {
            const response = await extra.api.put<void>(`/college/enrollment-types/${id}`, data);

            dispatch(fetchEnrollmentTypes());
            dispatch(fetchEnrollmentTypeDetail(id));

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
