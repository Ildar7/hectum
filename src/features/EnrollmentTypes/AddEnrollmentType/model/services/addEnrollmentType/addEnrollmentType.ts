import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddEnrollmentTypeErrors, AddEnrollmentTypeType } from 'features/EnrollmentTypes/AddEnrollmentType';
import { fetchEnrollmentTypes } from 'entities/EnrollmentTypes/model/services/fetchEnrollmentTypes/fetchEnrollmentTypes';
import { getAddEnrollmentTypeTitle } from '../../selectors/getAddEnrollmentTypeTitle/getAddEnrollmentTypeTitle';
import { addEnrollmentTypeActions } from '../../slice/addEnrollmentTypeSlice';

export const addEnrollmentType = createAsyncThunk<AddEnrollmentTypeType, void, ThunkConfig<AddEnrollmentTypeErrors>>(
    'enrollmentTypes/addEnrollmentType',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addEnrollmentTypeTitle = getAddEnrollmentTypeTitle(getState() as any);

        const data = {
            title: addEnrollmentTypeTitle,
        };

        try {
            const response = await extra.api.post<AddEnrollmentTypeType>('/college/enrollment-types/', data);

            dispatch(fetchEnrollmentTypes());
            dispatch(addEnrollmentTypeActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
